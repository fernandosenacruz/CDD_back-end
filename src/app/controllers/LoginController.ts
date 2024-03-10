import { NextFunction, Response } from 'express';
import StatusCodes from '../helpers/others/StatusCodes';
import { TypedRequest, TypedResponse } from '../interfaces';
import { IContext } from '../interfaces';
import LoginService from '../services/LoginService';
import { IUserResponse } from '../interfaces/User';
import { User } from '@prisma/client';

export default class LoginCrontroller {
  constructor(
    private ctx: IContext,
    private clientService = new LoginService()
  ) {}

  public login = async (
    req: TypedRequest<User>,
    res: Response,
    _next: NextFunction
  ): Promise<TypedResponse<IUserResponse>> => {
    const { userName, password } = req.body;
    const response = await this.clientService.login(
      userName,
      password,
      this.ctx
    );

    return res.status(StatusCodes.OK).json(response);
  };
}
