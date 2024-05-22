import { prisma } from "@/lib";
import sendResponse from "@/lib/response";
import { validateApiRequest } from "@/lib/validate-api-request";
import { slugify } from "@/utils/slugify";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get('slug')
    const id = searchParams.get('id')

    let categories: any = []

    if (slug) {
      categories = await prisma.category.findUnique({
        where: {
          slug: slug
        },
        include: {
          subCategories: true
        }
      });
    }
    else if (id) {
      categories = await prisma.category.findUnique({
        where: {
          id: id
        },
        include: {
          subCategories: true
        }
      });
    }
    else {
      categories = await prisma.category.findMany();
    }

    return sendResponse({
      data: categories,
      success: true,
      message: 'Categories fetched successfully'
    })
  }
  catch (e: any) {
    return sendResponse({
      data: e.message,
      success: false,
      message: 'Failed to fetch categories'
    })
  }
}

export async function POST(request: Request) {
  try {
    const res: any = await validateApiRequest(request);

    let parentSlugs = ''

    const createResponse = await prisma.category.create({
      data: {
        name: res.name,
        description: res.description,
        image: res.image,
        slug: slugify(res.name),
        parent: res.parent ? {
          connect: {
            id: res.parent
          }
        } : undefined
      },
    });

    return sendResponse({
      data: createResponse,
      success: true,
      message: 'Category created successfully',
    })
  } catch (e: any) {
    return sendResponse({
      data: e.message,
      success: false,
      message: 'Failed to create category',
    })
  }
}
