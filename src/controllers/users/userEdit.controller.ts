import { Request, Response } from "express";
import { userEditService } from "../../services/users/userEdit.service";

const userEditController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const update = await userEditService(id, data);

  return res.status(200).json({ message: "Updated succcessfully" });
};

export { userEditController };
