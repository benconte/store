import { fetchAllProducts, getCategories } from '@/actions'
import Categories from '@/components/store/Categories'
import FilteredProducts from '@/components/store/FilteredProducts'
import React from 'react'
import Loading from './loading';

interface CategoryProps {
    category: string;
}

interface props {
    searchParams: CategoryProps
}

const page = async ({ searchParams }: props) => {
    const category: string | undefined = decodeURIComponent(searchParams.category);
    const categories = await getCategories()
    const products = await fetchAllProducts(searchParams.category ? category : "");
    return (
        <div className='w-full h-full px-2 md:px-7 lg:px-12 py-5 md:py-8'>
            <Categories categories={categories} />
            {products ? (
                <FilteredProducts products={products} />
            ) : (
                <Loading />
            )}
        </div>
    )
}

export default page