import { User } from '../../types/User.ts';
import { BaseApi } from '../BaseApi.ts';
import { SignupResponse } from './types/SignupResponse.ts';
import { SigninBody } from './types/SigninBody.ts';
import { BASE_URL_HTTP } from '../../utils/const.ts';

class AuthApi extends BaseApi {

  signup(newUser: Omit<User, 'id' | 'avatar' | 'display_name'>): Promise<SignupResponse> {
    return this.http.post<SignupResponse, Omit<User, 'id' | 'avatar' | 'display_name'>>('/signup', {
      data: newUser,
      credentials: true },
    );
  }

  signin(signinBody: SigninBody): Promise<string> {
    return this.http.post<string>('/signin', { data: signinBody, credentials: true });
  }

  getAuthUserInfo(): Promise<User> {
    return this.http.get<User>('/user', { credentials: true });
  }

  logout(): Promise<string> {
    return this.http.post<string>('/logout', { credentials: true });
  }
}

export default new AuthApi(BASE_URL_HTTP + '/auth');
