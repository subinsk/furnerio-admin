import { prisma, validateApiRequest } from "@/lib";

export async function GET(){
    const products = await prisma.product.findMany()

    return Response.json({
        success: true,
        products
    })
}

export async function POST(request: Request){
    try{
        const res: any = await validateApiRequest(request)

        const createProductResponse = await prisma.product.create({
            data:{
                name: res.name,
                description: res.description,
                price: res.price
            }
        })
    }
    catch(e:any){
        return Response.json({
            success: false,
            message: e.message
        })
    }
}