import { Request, Response,NextFunction } from "express";
import ListProductService from "../services/ListProductService";
import CreateProductService from "../services/CreateProductService";
import ShowProductService from "../services/ShowProductService";
import DeleteProductService from "../services/DeleteProductService";
import UpdateProductService from "../services/UpdateProductService";
export default class ProductsController{

    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const listProducts = new ListProductService();
            const products = await listProducts.execute();
            return response.json(products);
        } catch(err) {
            next(err);
        }
    }
    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const { id } = request.params;
            const ShowProducts = new ShowProductService();
            const product = await ShowProducts.execute({id});
            return response.json(product);
        } catch(err) {
            next(err);
        }
    }
    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const { name, price, quantity} = request.body;
            const createProducts = new CreateProductService();
            const product = await createProducts.execute({name, price, quantity});
            return response.json(product);
        } catch(err) {
            next(err);
        }
    }
    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const { id } = request.params;
            const { name, price, quantity} = request.body;
            const updateProduct = new UpdateProductService();
            const product = await updateProduct.execute({id, name, price, quantity});
            return response.json(product);
        } catch(err) {
            next(err);
        }
    }
    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const { id } = request.params;
            const deleteProducts = new DeleteProductService();
            await deleteProducts.execute({id});
            return response.json([]);
        } catch(err) {
            next(err);
        }
    }
}