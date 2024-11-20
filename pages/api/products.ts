import { NextApiRequest, NextApiResponse } from 'next';
import { setProductAsBought, getProductById } from '@/services/productService'; // Import the setProductAsBought function

// New API route to update a product
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { id } = req.body; // Assuming only the product ID is sent in the request body

        try {
            const updatedProduct = await setProductAsBought(id); // Call the setProductAsBought function
            res.status(200).json({ message: 'Product marked as bought successfully', product: updatedProduct });
        } catch (error) {
            res.status(500).json({ message: 'Error marking product as bought', error: error instanceof Error ? error.message : 'Unknown error' });
        }
    } else if (req.method === 'GET') {
        const { id } = req.query; // Assuming the product ID is sent as a query parameter
        const productId = Array.isArray(id) ? id[0] : id; // Handle case where id might be an array
        const numericId = productId ? Number(productId) : 0; // Convert to number or set to undefined

        try {
            const product = await getProductById(numericId); // Call a function to get the product by ID
            if (product) {
                res.status(200).json({ product });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving product', error: error instanceof Error ? error.message : 'Unknown error' });
        }
    } else {
        // Handle other HTTP methods
        res.setHeader('Allow', ['PUT', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
