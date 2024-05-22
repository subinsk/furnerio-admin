import { prisma, validateApiRequest } from "@/lib";
import sendResponse from "@/lib/response";
import { slugify } from "@/utils/slugify";

export async function GET() {
    try {
        const products = await prisma.product.findMany()

        return sendResponse({
            data: products,
            success: true,
            message: 'Products fetched successfully'
        })
    }
    catch (e: any) {
        return sendResponse({
            data: e.message,
            success: false,
            message: 'Failed to fetch products'
        })
    }
}

export async function POST(request: Request) {
    try {
        const res: any = await validateApiRequest(request)

        const createProductResponse = await prisma.product.create({
            data: {
                name: res.name,
                description: res.description,
                price: res.price,
                image: res.image,
                category: {
                    connect: {
                        id: res.categoryId
                    }
                },
                sku: res.sku,
                slug: slugify(
                    `${res.name} ${res.sku}`
                ),
            }
        })

        return sendResponse({
            data: createProductResponse,
            success: true,
            message: 'Product created successfully'
        })
    }
    catch (e: any) {
        return sendResponse({
            data: e.message,
            success: false,
            message: 'Failed to create product'
        })
    }
}