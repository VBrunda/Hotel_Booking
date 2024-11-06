import { Router } from "express";
import { addUpdateUser, allUsers, login, registerUser, removeUser } from "../controllers/auth-controller";

const userRoutes = Router();

userRoutes.post("/Login", login);
userRoutes.get("/GetAllUsers", allUsers);
userRoutes.post("/AddUpdateUser", addUpdateUser);
userRoutes.delete("/DeleteUserById", removeUser);


export default userRoutes;