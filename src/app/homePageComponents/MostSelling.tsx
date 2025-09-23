import ProductCard from '@/components/custom/ProductCard/ProductCard';
import SectionTitle from '@/components/custom/SectionTitle/SectionTitle';
import { Product } from '@/Types/Types'
import React from 'react'

const MostSelling = ({ trendingProducts }: { trendingProducts: Product[] }) => {

    return (
        <div className='mt-16 mb-8 pb-10'>

            <SectionTitle title="Most Selling" />

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4'>
                {trendingProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>


        </div>
    )
}

export default MostSelling