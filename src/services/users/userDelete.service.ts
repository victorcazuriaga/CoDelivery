import AppDataSource from '../../data-source';
import { Users } from '../../entities/user.entity';

const userDeleteService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Users);

  const users = await userRepository.find();

  const userDelete = users.find((user) => user.id === id);

  await userRepository.delete(userDelete!.id);

  return true;
};

export { userDeleteService };
