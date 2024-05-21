import { prisma } from "@/lib";

export async function GET(){
    const orders = await prisma.order.findMany();

    return Response.json({
        success: true,
        orders
    });
}

export async function POST(request: Request){
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

        return Response.json({
            success: true,
            data: createResponse
        });
    } catch (e: any) {
        return Response.json({
            success: false,
            message: e.message
        });
    }
}

