import { Request, Response } from "express";
import { deleteProductService } from "../../services/product/deleteProduct.service";

const deleteProductController = async (req: Request, res: Response) => {
  const isRestaurant: boolean = req.user.isRestaurant;
  const id = req.params.id;
  const deletedProduct = await deleteProductService(id, isRestaurant);
  return res.status(200).json({ message: "Product deleted successfully" });
};

export { deleteProductController };
