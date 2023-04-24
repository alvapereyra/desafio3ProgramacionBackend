import {promises as fs} from "fs"

export default class ProductManager {
    constructor(){
        this.path = "./productos.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        
        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products));
    };
    
    readProducts = async () => {
        let respuesta = await fs.readFile(this.path, "utf-8");
        return (JSON.parse(respuesta))
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2);
    };

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find((product) => product.id === id)
        ) {
            console.log("Producto no encontrado");
        } else {
            let productById = respuesta3.find((product) => product.id === id);
            console.log(productById);
            return productById;
        }
        
    }
    
    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("Producto Eliminado");
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts()
        let productsModif = [
            {...producto, id}, ...productOld
        ]
        await fs.writeFile(this.path, JSON.stringify(productsModif));
    };
}


// const productos = new ProductManager();

// productos.addProduct("Titulo1", "Description1", 1000, "Img1", "abc123", 5);
// productos.addProduct("Titulo2", "Description2", 2000, "Img2", "abc124", 6);
// productos.addProduct("Titulo3", "Description3", 3000, "Img3", "abc125", 7);
// productos.addProduct("Titulo4", "Description4", 4000, "Img4", "abc126", 8);
// productos.addProduct("Titulo5", "Description5", 5000, "Img5", "abc127", 9);
// productos.addProduct("Titulo6", "Description6", 6000, "Img6", "abc128", 1);
// productos.addProduct("Titulo7", "Description7", 7000, "Img7", "abc129", 2);
// productos.addProduct("Titulo8", "Description8", 8000, "Img8", "abc130", 3);
// productos.addProduct("Titulo9", "Description9", 9000, "Img9", "abc131", 4);
// productos.addProduct("Titulo10","Description10",10000,"Img10", "abc132", 5);

// productos.getProducts()

// productos.getProductsById(3)

// productos.deleteProductsById(2)

// productos.updateProducts({
//     title: 'Titulo3',
//     description: 'Description3',
//     price: 2000,
//     thumbnail: 'Img3',
//     code: 'abc125',
//     stock: 7,
//     id: 3
// })