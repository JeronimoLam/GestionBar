// models/product.model.ts
export class Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    businessId: number;
  
    constructor(id: number, name: string, price: number, stock: number, businessId: number) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.stock = stock;
      this.businessId = businessId;
    }
  }
  