import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import SessionsController from "../controllers/SessionsController";

const sessionsRouter = Router();
const sessionsConstroller = new SessionsController();

sessionsRouter.post('/', celebrate({
    [Segments.BODY] : {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }
}),async(req,res,next) =>{
    try{
        await sessionsConstroller.create(req, res, next);
    }catch(err){
        next(err);
    }
});
export default sessionsRouter;