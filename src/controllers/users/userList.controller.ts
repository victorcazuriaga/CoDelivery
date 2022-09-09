import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { userListService } from '../../services/users/userList.service';

const userListController = async (req: Request, res: Response) => {
  const { id } = req.user;

  const user = await userListService(id);

  return res.status(200).json(instanceToPlain(user));
};

export { userListController };
