import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";

const userListService = async (id: string) : Promise<Users[]> => {

    const userRepository = AppDataSource.getRepository(Users)

    const user = await userRepository.find({where: {id}})

    return user
}

export {userListService}