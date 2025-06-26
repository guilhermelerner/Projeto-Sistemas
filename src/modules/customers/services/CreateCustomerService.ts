import { getCustomRepository } from "typeorm";

import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";


interface IRequest{
    name: string;
    email: string;
}

export default class CreateCustomerService{
    public async execute({name, email} : IRequest) : Promise<Customer>{
        const customersRepository = getCustomRepository(CustomersRepository);
        const emailExist = await customersRepository.findByEmail(email);
        if(emailExist){
            throw new AppError('Email adress already used');
        }
        const customer = customersRepository.create({
            name, 
            email,
            });
        await customersRepository.save(customer);
        return customer;
    }
}