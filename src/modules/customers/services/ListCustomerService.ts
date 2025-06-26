import { getCustomRepository } from "typeorm";

import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";


export default class ListCustomerService{
    public async execute() : Promise<Customer[]>{
        const customersRepository = getCustomRepository(CustomersRepository);
        const customer = await customersRepository.find();
        return customer;
    }
}