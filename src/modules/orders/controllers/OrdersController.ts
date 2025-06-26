import { Request, Response,NextFunction } from "express";
import ShowOrderService from "../services/ShowOrderService";
import ListOrderService from "../services/ListOrderService";
import CreateOrderService from "../services/CreateOrderService";

export default class OrdersController{

    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const listOrders = new ListOrderService();
            const order = await listOrders.execute();
            return response.json(order);
        } catch(err) {
            next(err);
        }
    }
    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const { id } = request.params;
            const ShowOrder = new ShowOrderService();
            const order = await ShowOrder.execute({id});
            return response.json(order);
        } catch(err) {
            next(err);
        }
    }
    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const { customer_id, products} = request.body;
            const createOrder = new CreateOrderService();
            const order = await createOrder.execute({customer_id, products});
            return response.json(order);
        } catch(err) {
            next(err);
        }
    }
}