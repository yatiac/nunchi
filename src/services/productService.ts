// Import Prisma Client
import { PrismaClient } from '@prisma/client';
import { Product } from "@/types/product";

const prisma = new PrismaClient(); // Instantiate Prisma Client

// Create a new product
export const createProduct = async (data: Product): Promise<Product> => {
    try {
        return await prisma.product.create({
            data,
        });
    } catch (error: unknown) {
        throw new Error('Error creating product: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
};

export const getProductById = async (id: number): Promise<Product> => {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error: unknown) {
        throw new Error('Error getting product by ID: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
};

// Update an existing product
export const updateProduct = async (id: number, data: Product): Promise<Product> => {
    try {
        return await prisma.product.update({
            where: { id },
            data,
        });
    } catch (error: unknown) {
        throw new Error('Error updating product: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
};

// Set product as bought
export const setProductAsBought = async (id: number): Promise<Product> => {
    try {
        return await prisma.product.update({
            where: { id },
            data: {
                bought: true,
            },
        });
    } catch (error: unknown) {
        throw new Error('Error setting product as bought: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
};

// Delete a product
export const deleteProduct = async (id: number): Promise<Product> => {
    try {
        return await prisma.product.delete({
            where: { id },
        });
    } catch (error: unknown) {
        throw new Error('Error deleting product: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
};

