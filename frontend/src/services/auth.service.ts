import axios from "axios";
import { User, loginUser } from '../types/users'
import { API_URL } from '../types/api'

class AuthService {
  login(loginUserData: loginUser) {
    return axios
      .post(API_URL + "users/login/", { ...loginUserData })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(userData: User) {
    return axios.post(API_URL + "users/register/", {...userData });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    console.log(userStr);
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
