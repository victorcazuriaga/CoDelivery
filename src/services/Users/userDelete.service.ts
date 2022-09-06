import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const userDeleteService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(Users)
    
    const user = await userRepository.findOne({ where: {id}})

    if(!user){
        throw new AppError("User not found", 400)
    }

    await userRepository.update(id, {isActive: false})

    return true
}

export {userDeleteService}