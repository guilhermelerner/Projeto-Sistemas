import { Request, Response,NextFunction } from "express";
import ShowCustomerService from "../services/ShowCustomerService";
import ListCustomerService from "../services/ListCustomerService";
import CreateCustomerService from "../services/CreateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";
import UpdateCustomerService from "../services/UpdateCustomersService";

export default class CustomersController{

    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const listCustomers = new ListCustomerService();
            const customers = await listCustomers.execute();
            return response.json(customers);
        } catch(err) {
            next(err);
        }
    }
    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const { id } = request.params;
            const ShowCustomer = new ShowCustomerService();
            const customer = await ShowCustomer.execute({id});
            return response.json(customer);
        } catch(err) {
            next(err);
        }
    }
    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const { name, email} = request.body;
            const createCustomer = new CreateCustomerService();
            const customer = await createCustomer.execute({name,email});
            return response.json(customer);
        } catch(err) {
            next(err);
        }
    }
    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const { id } = request.params;
            const { name,email } = request.body;
            const updateCustomer = new UpdateCustomerService();
            const customer = await updateCustomer.execute({id, name, email});
            return response.json(customer);
        } catch(err) {
            next(err);
        }
    }
    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const { id } = request.params;
            const deleteCustomer = new DeleteCustomerService();
            await deleteCustomer.execute({id});
            return response.json([]);
        } catch(err) {
            next(err);
        }
    }
}