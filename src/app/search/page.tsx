import { getProductById } from '@/actions';
import React from 'react'
import ProductNotFound from '@/components/search/ProductNotFound';
import SearchProduct from '@/components/search/SearchProduct';

interface SearchProduct {
    productId: string;
}

interface Props {
    params: SearchProduct
}

const page = async ({ params }: Props) => {
    const product = await getProductById(params.productId);
    return (
        <div>
            {product ? (
                <SearchProduct product={product} />
            ): (
                <ProductNotFound />
            )}
        </div>
    )
}

export default page