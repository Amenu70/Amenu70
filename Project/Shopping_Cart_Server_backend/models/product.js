const productdb=require('../data/productdatabase')
let counter = 5;

module.exports = class Product {
    constructor(id, title, description, price,stock,myImage) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.myImage = myImage;
    }

    save(){
        this.id = ++counter; //start with 1;
        productdb.push(this);
        return this;
    }
    edit(){
        const index = db.findIndex(prod => prod.id == this.id);
        productdb.splice(index, 1, this);
        return this;
    }
    static getAll(){
        return productdb;
    }

    static deleteById(prodId){
        const index = productdb.findIndex(prod => prod.id == prodId);
        const deletedProd = productdb[index];
        productdb.splice(index, 1);
        return deletedProd;
    }
}