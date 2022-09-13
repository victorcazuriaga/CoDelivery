import AppDataSource from "../../data-source"
import { PaymentInfo } from "../../entities/paymentInfo.entity"
import { Users } from "../../entities/user.entity"
import { AppError } from "../../errors/AppError"
import { IPaymentInfoRequest } from "../../interfaces/paymentInfo"

const createPaymentInfoService = async ({userId,name,cardNo,cvvNo,expireDate, cpf}:IPaymentInfoRequest) => {
    const userRepository = AppDataSource.getRepository(Users);
    const paymentRepository = AppDataSource.getRepository(PaymentInfo);


    try {
        const cpfExists = await paymentRepository.findOne({ where: { cpf } });
        const userIdValid =await userRepository.findOne({where:{id:userId}})
     
       
   
        if(!userIdValid){
   
            throw new AppError('User not found', 400);
        }
        
   
       if(cpfExists){
           throw new AppError('cpf is already being used', 400);
       }
   
       const newPayment= new PaymentInfo()
       newPayment.name=name
       newPayment.cardNo=cardNo
       newPayment.cvvNo=cvvNo
       newPayment.expireDate=expireDate
       newPayment.cpf=cpf
   
       paymentRepository.create(newPayment)
       await paymentRepository.save(newPayment)
   
       await userRepository.update(userId, { paymentInfo:newPayment })
       return true 
    } catch (error) {
        if(error instanceof Error){
            throw new AppError(error.message, 400);
        }
    }
   
}

export{createPaymentInfoService}