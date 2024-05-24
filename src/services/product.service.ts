import { api, endpoints } from "@/lib/axios"
import { useMemo } from "react";
import useSWR from "swr";

export function useGetProducts(params?: { id?: string; slug?: string }) {
    const { id, slug } = params || {};
    const productEndpoint = endpoints.product;

    const URL = id ? `${productEndpoint}?id=${id}` : slug ? `${productEndpoint}?slug=${slug}` : productEndpoint;

    const { data, isLoading, error, isValidating } = useSWR(URL, async (url) => {
        const res = await api.get(url);
        return res.data;
    });


    const products = useMemo(() => {
        if (slug || id) {
            return data?.data?.subCategories;
        } else {
            return data?.data;
        }
    }, [data, slug, id]);

    const memoizedValue = useMemo(
        () => ({
            productDetails: data?.data,
            products: products || [],
            productsLoading: isLoading,
            productsError: error,
            productsValidating: isValidating,
            productsEmpty: !isLoading && !products.length,
        }),
        [products, data?.data, error, isLoading, isValidating]
    );

    return memoizedValue;
}
export const createProduct = async (data: any) => {
    const response = await api.post(endpoints.product, data)
    return response.data
}

export const getProducts = async () => {
    const response = await api.get(endpoints.product)
    return response.data
}

export const getProductById = async (id: string) => {
    const response = await api.get(`${endpoints.product}?id=${id}`)
    return response.data
}

export const updateProduct = async (data: any) => {
    const response = await api.put(endpoints.product, data)
    return response.data
}

export const deleteProduct = async (id: string) => {
    const response = await api.delete(`${endpoints.product}?id=${id}`)
    return response.data
}

export const getProductBySlug = async (slug: string) => {
    const response = await api.get(`${endpoints.product}?slug=${slug}`)
    return response.data
}
