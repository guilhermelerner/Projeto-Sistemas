import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";


interface IRequest{
    id: string;
    name: string;
    email: string;
}

export default class UpdateCustomerService{
    public async execute({id, name, email} : IRequest) : Promise<Customer>{
        const customersRepository = getCustomRepository(CustomersRepository);
        const customer = await customersRepository.findById(id);
        if(!customer){
            throw new AppError('Customer not found.');
        }
        const customerExists = await customersRepository.findByEmail(email);
        if(customerExists && email != customer.email){
            throw new AppError('Email address already used');
        }
        customer.name = name;
        customer.email = email;
        await customersRepository.save(customer);
        return customer
    }
}