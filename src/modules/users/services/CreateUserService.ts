import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import { hash } from "bcryptjs";

interface IRequest{
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService{
    public async execute({name, email, password} : IRequest) : Promise<User>{
        const UserRepository = getCustomRepository(UsersRepository);
        const emailExist = await UserRepository.findByEmail(email);
        if(emailExist){
            throw new AppError('Email adress already used');
        }
        const hashedPassword = await hash(password , 8);
        const user = UserRepository.create({
            name, 
            email,
            password : hashedPassword});
        await UserRepository.save(user);
        return user;
    }
}