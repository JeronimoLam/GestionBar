// controllers/user.controller.ts
import prisma from "../config/database.config.ts";
import {User} from "../models/user.model.ts"

export class UserController {
  static async getUsers() {
    return await prisma.user.findMany();
  }

  
  static async createUser(data: { name: string; email: string; password: string } | User) {
    const user = data instanceof User ? data : new User(data.name, data.email, data.password);
    return await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }
}
