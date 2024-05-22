import { prisma } from "@/lib";
import sendResponse from "@/lib/response";

export async function GET() {
    const orders = await prisma.order.findMany();

    return sendResponse({
        data: orders,
        message: "Orders fetched successfully",
        success: true
    });
}

export async function POST(request: Request) {
    try {
        const requestBody: any = await request.json();

        const createResponse = await prisma.order.create({
            data: {
                user: { connect: { id: requestBody.userId } },
                products: {
                    connect: requestBody.productIds.map((productId: string) => {
                        return { id: productId };
                    })
                }
            }
        });

        return sendResponse({
            data: createResponse,
            message: "Order created successfully",
            success: true
        });
    } catch (e: any) {
        return sendResponse({
            data: e.message,
            message: "Failed to create order",
            success: false
        });
    }
}

