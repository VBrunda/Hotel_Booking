import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import Customers, { ICustomer } from "../model/customer-model";
import { createSuccess } from "../utils/successResponse";

export const getAllCustomers  = async (request:Request, response: Response, next: NextFunction) => {
    try {
        const customers = await Customers.find().sort({custId:-1});
        if(customers.length > 0){
            return next(createSuccess(200, "Customers found", customers));
        }
        return next(createSuccess(200, "Couldn't find any Customers", []));
    } catch (error:any) {
        return next(new ErrorResponse("Couldn't get all Customers", 500))
    }   
}
export const addUpdateCustomers  = async (request:Request, response: Response, next: NextFunction) =>{
    try {
        const customer: ICustomer = request.body;
            if(customer.custId > 0){
                await Customers.findOneAndUpdate({custId: customer.custId},
                    {$set: customer},
                    {new: true, runValidators: true});
            }else{
                const maxCustId = await Customers.findOne({}, {custId:1}).sort({custId: -1});
                const newCustId = maxCustId ? maxCustId.custId + 1 : 1;
                customer.custId = newCustId;
                await Customers.create(customer);
            }
        return next(createSuccess(200, "Create/Update Customers Successfull", {custId: customer.custId}));
    } catch (error:any) {
        return next(new ErrorResponse(`Couldn't create/update Customers ${error.message}`, 500))
    }
}
export const deleteCustomer  = async (request:Request, response: Response, next: NextFunction) => {
    try {
        const id = request.query.custId;
        if(id){
            const existingCust = await Customers.findOne({custId: id});
            if(existingCust){
                const deletedCustomer = await Customers.findOneAndDelete({custId: id});
                return next(createSuccess(200, 'Customer Deleted Successfully', {custId: id}));
            }
            return next(new ErrorResponse(`Customer ${id} Not found`, 404));
        }
    } catch (error:any) {
        return next(new ErrorResponse("Couldn't delete Customer", 500))
    }    
}