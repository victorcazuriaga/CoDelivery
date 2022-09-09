import { Request, Response } from "express";
import { userSoftDeleteService } from "../../services/users/userSoftDelete.service";

const userSoftDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await userSoftDeleteService(id);

  return res.status(200).json({ message: "User deactivated successfully" });
};

export { userSoftDeleteController };
