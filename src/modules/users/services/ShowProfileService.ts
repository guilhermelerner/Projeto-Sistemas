import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";


interface IRequest{
    user_id: string;
}


export default class ShowProfileService{

    public async execute({user_id} : IRequest) : Promise<User>{
        const UserRepository = getCustomRepository(UsersRepository);
        const user = await UserRepository.findById(user_id);
        if(!user){
            throw new AppError('User not found');
        }
        return user;
    }
}