'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Fetch a list by its slug.
 * @param {string} slug - The slug of the list to retrieve.
 * @returns {Promise<Object|null>} - The list object or null if not found.
 */
export async function getListBySlug(slug: string) {
    return await prisma.list.findUnique({
        where: { slug },
        include: { 
            products: {
                where: { bought: false }
            }
        },
    });
}