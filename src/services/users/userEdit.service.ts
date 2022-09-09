import AppDataSource from '../../data-source';
import { Address } from '../../entities/address.entity';
import { PaymentInfo } from '../../entities/paymentInfo.entity';
import { Users } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';

const userEditService = async (id: string, data: any) => {
  const userRepository = AppDataSource.getRepository(Users);
  const addressRepository = AppDataSource.getRepository(Address);
  const paymentRepository = AppDataSource.getRepository(PaymentInfo);

  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (typeof data !== 'object') {
    throw new AppError('Request format is not an object', 400);
  }
  if (
    data.id ||
    data.createdAt ||
    data.updatedAt ||
    data.isRestaurant ||
    data.isActive ||
    data.address?.id ||
    data.cart?.id ||
    data.paymentInfo?.id ||
    data.cart?.price
  ) {
    throw new AppError('Those changes are not allowed', 403);
  }

  if (data.paymentInfo?.cpf) {
    const cpfChecker = await paymentRepository.findOne({
      where: { cpf: data.paymentInfo.cpf },
    });

    if (cpfChecker) {
      throw new AppError('Given CPF is already being used', 409);
    }
  }

  try {
    if (data.address) {
      if (user.addresses.length === 1) {
        const addresses = await addressRepository.find();

        const updatedAddress = addresses.find(
          (address) => address.id === user.addresses[0].id
        );
        await addressRepository.update(user.addresses[0].id, {
          ...user.addresses[0],
          ...data.addressInfo,
        });
        delete data.addressInfo;
      } else {
        //   There should be a way to treat information when
        //	 there are more than two addresses.
      }
    }

    if (data.paymentInfo) {
      const payment = await paymentRepository.find();

      const updatedPayment = payment.find(
        (payment) => payment.id === user.paymentInfo.id
      );
      await paymentRepository.update(user.paymentInfo.id, {
        ...user.paymentInfo,
        ...data.paymentInfo,
      });
      delete data.paymentInfo;
    }

    data.updatedAt = new Date();

    await userRepository.update(user.id, { ...user, ...data });

    return true;
  } catch (error) {
    throw new AppError('Request has invalid properties', 422);
  }
};

export { userEditService };
