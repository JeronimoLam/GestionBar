// models/user.model.ts
export class User {
    id?: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;

    validate() {
        if (!this.email.includes("@")) {
          throw new Error("Invalid email address");
        }
      }

    constructor(name: string, email: string, password: string){
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    create_complete_new(name: string, email: string, password: string, createdAt: Date, UpdatedAt: Date){
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = UpdatedAt;
    }

  }
  