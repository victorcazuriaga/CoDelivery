import { Request, Response } from "express";
import { userDeleteService } from "../../services/users/userDelete.service";

const userDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;

   const deleted=await userDeleteService(id);

  return res.status(200).json({ message: "User deleted successfully" });
};

export { userDeleteController };
