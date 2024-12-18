// models/business.model.ts
export class Business {
    id: number;
    name: string;
    ownerId: number;
  
    constructor(id: number, name: string, ownerId: number) {
      this.id = id;
      this.name = name;
      this.ownerId = ownerId;
    }
  }
  