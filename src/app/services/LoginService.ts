import ERRORS from '../helpers/errors/error';
import MESSAGES from '../helpers/others/messages';
import StatusCodes from '../helpers/others/StatusCodes';
import AuthHelper from '../helpers/auths/auth';
import IContext from '../interfaces/Context';
import Models from '../models';
import IUserModel  from './../interfaces/UserModel';
import { ILoginResponse } from '../interfaces/User';

import compareHashPassword from '../utils/compareHashPassword';

export default class LoginService {
  constructor(private userModel: IUserModel = Models.UserModel) {}

  public login = async (
    userName: string,
    password: string,
    ctx: IContext
  ): Promise<ILoginResponse> => {
    const user = await this.userModel.getOneLogin(userName, ctx);

    if (!user) throw ERRORS.USER.NOT_FOUND;

    if (!await compareHashPassword(password, user.password)) throw ERRORS.USER.WORG_PASSWORD;
  
    const dbUser = { userName, password };

    const token = AuthHelper.generateToken(dbUser);

    return {
      message: MESSAGES.USERS.FOUND,
      statusCode: StatusCodes.OK,
      user,
      token
    };
  };

}
