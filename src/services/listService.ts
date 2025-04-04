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

/**
 * Fetch all lists for a specific user.
 * @param {string} userId - The ID of the user whose lists to retrieve.
 * @returns {Promise<Object[]>} - Array of list objects belonging to the user.
 */
export async function getListsByUserId(userId: string) {
    return await prisma.list.findMany({
        // where: { userId },
        include: {
            products: {
                where: { bought: false }
            }
        }
    });
}

/**
 * Fetch all lists.
 * @returns {Promise<Object[]>} - Array of list objects.
 */
export async function getLists() {
    return await prisma.list.findMany({
        include: {
            products: {
                where: { bought: false }
            }
        }
    });
}