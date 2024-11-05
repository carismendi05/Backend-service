import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product"; 

//Traemos la tabla o entidad producto de la base de datos 
const productRepository = AppDataSource.getRepository(Product)

//Obtener todos los productos 
export const getAllProducts = async(req: Request, res: Response) => {
    try { 
        const products = await productRepository.find();
        res.json(products);
    }   catch(error) {
        res.status(500).json({
            message: "Error al obtener los productos."
        });
    }
};

// Obtener producto (GET)
export const getProductByID = async(req: Request, res: Response) => {
    try {
        const product = await productRepository.findOneBy({
            id: parseInt(req.params.id)
        });
        if (product) {
        } else {
            res.status(404).json({
                message: "Producto no encontrado."
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error al obtener el producto."
        });
    }
};

// Crear un producto
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price } = req.body;
        const product = new Product();
        product.name = name;
        product.description = description;
        product.price = price;

        await productRepository.save(product);
        res.status(201).json({
            message: "Producto creado exitosamente."
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el producto."
        });
    }
};

// Actualizar un producto existente
export const updateProduct = async(req: Request, res: Response) => {
    try {
        const {name, description, price} = req.body; // tomamos los datos del request 

        // Buscamos el producto para actualizarlo 
        const product = await productRepository.findOneBy({
            id: parseInt(req.params.id)
        });

// Validamos que el producto tenga informacion 
if (product) {
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    await productRepository.save(product); // Guardamos los cambios del producto 
    res.status(404).json({
        message: "No se encontro el producto."
    });
}

// Eliminar un producto existente 
export const deleteProduct = async(req: Request, res: Response) => {
    try {
        // Buscamos el producto para eliminarlo 
        const product = await productRepository.findOneBy({
            id: parseInt(req.params.id)
        });

        // Validamos que el producto tenga informacion
        if (product) {
            await productRepository.remove(product); // Borramos el producto
            res.json({
                message: "Producto Eliminado."
            });
        } else {
            res.status(404).json({
                message: "No se encontró el producto."
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error al eliminar el producto."
        });
    }
};




