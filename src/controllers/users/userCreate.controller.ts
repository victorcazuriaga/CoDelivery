import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { userCreateService } from '../../services/users/userCreate.service';

const userCreateController = async (req: Request, res: Response) => {
  const { fullName, userName, email, password, address, paymentInfo } =
    req.body;
  const newUser = await userCreateService({
    fullName,
    userName,
    email,
    password,
    address,
    paymentInfo,
  });
  return res.status(201).json(instanceToPlain(newUser));
};

export { userCreateController };
