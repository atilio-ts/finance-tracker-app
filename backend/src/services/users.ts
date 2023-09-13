
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User, UserAdd } from '../types/users';
import { UserModel } from '../../database/models'
import { HttpStatusCode } from '../types/error';

const SALT =  +process.env.SALT!;
const JWT_SECRET = process.env.JWT_SECRET!;

interface JwtPayload {
  id: string,
  email: string
}

export class UserService {

  static get userAttributes() {
    return ['id', 'email']
  }

  static async register({ email, password }: UserAdd) {
    try{
      const hash = await bcrypt.hash(password, SALT);
      await UserModel.create({ email, password: hash });
    }catch (error){
      throw error;
    }
  }

  static async login({ email, password }: User) {
    const foundUser = await UserModel.findOne({ where: { email } });
    const user = foundUser?.dataValues as User;
    if(user) {
      try{
        const validPassword =  await bcrypt.compare(password, user.password)
        if (!validPassword) throw HttpStatusCode.UNAUTHORIZED;
        else return { token: jwt.sign({ id: user.id.toString(), email: user.email }, JWT_SECRET) };
      }catch (error){
        throw error;
      }
    }else throw HttpStatusCode.NOT_FOUND;
  }

  static async verifyToken(token: string) {
    try{
      let decoded = await jwt.verify(token, JWT_SECRET) as JwtPayload;
      let user = await UserModel.findOne({ where: { id: decoded.id } });
      return user?.dataValues;
    }catch (error){
      throw error;
    }
  }

  getUserById(id: number) {
    return UserModel.findOne({ where: { id } });
  }
}