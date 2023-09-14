
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User, loginUser } from '../types/users';
import { UserModel } from '../../database/models'
import { HttpStatusCode } from '../types/error';

const SALT =  +process.env.SALT!;
const JWT_SECRET = process.env.JWT_SECRET!;

interface JwtPayload {
  id: string,
  email: string
}

export class UserService {
  static async register(createUserData: User) {
    try{
      const foundUser = await UserModel.findOne({ where: { email: createUserData.email } });
      const user = foundUser?.dataValues as User;
      if(!user) {
        createUserData.password = await bcrypt.hash(createUserData.password, SALT);
        await UserModel.create({ ...createUserData });
      }else throw HttpStatusCode.CONFLICT;
    }catch (error){
      throw error;
    }
  }

  static async login(loginUserData: loginUser) {
    try{
      const foundUser = await UserModel.findOne({ where: { email: loginUserData.email } });
      const user = foundUser?.dataValues as User;
      if(user) {
        const validPassword =  await bcrypt.compare(loginUserData.password, user.password)
        if (!validPassword) throw HttpStatusCode.UNAUTHORIZED;
        else return { token: jwt.sign({ id: user.id.toString(), email: user.email }, JWT_SECRET) };
      }else throw HttpStatusCode.NOT_FOUND;
    }catch (error){
      throw error;
    }
  }

  static async updateUserData(updatedUserData: User) {
    try{
      const foundUser = await UserModel.findOne({ where: { id: updatedUserData.id } });
      const user = foundUser?.dataValues as User;
      if(user) {
        if (updatedUserData.password) updatedUserData.password = await bcrypt.hash(updatedUserData.password, SALT);
        await UserModel.update(updatedUserData, { where: { id: updatedUserData.id } });
      }else throw HttpStatusCode.NOT_FOUND;
    }catch (error:any){
      if(error.name === 'SequelizeUniqueConstraintError') throw HttpStatusCode.CONFLICT;
      throw error;
    }
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
}