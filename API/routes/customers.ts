import { Router } from "express";
import { getAllCustomers, addUpdateCustomers, deleteCustomer } from "../controllers/customer-controller";

const customerRoutes = Router();

customerRoutes.get("/allCustomers", getAllCustomers);
customerRoutes.post("/addUpdateCustomers", addUpdateCustomers);
customerRoutes.delete("/deleteCustomer", deleteCustomer);

export default customerRoutes;