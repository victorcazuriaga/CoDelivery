import AppDataSource from '../../data-source';
import { Users } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';

const userSoftDeleteService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Users);

  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  await userRepository.update(user.id, { isActive: false });

  return true;
};

export { userSoftDeleteService };
