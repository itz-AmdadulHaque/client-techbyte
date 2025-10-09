import SectionTitle from '@/components/custom/SectionTitle/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { fetchData } from '@/lib/fetchFunction';
import { CategoryType } from '@/Types/Types';
import Image from 'next/image';
import Link from 'next/link';

const BrandsSection = async () => {

    const data = await fetchData("/brands")
    const brands = data.data;


    return (
        <div className='mt-16 mb-8 pb-10'>

            <SectionTitle title="Brands" />

            <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4'>
                {brands.slice(0, 6).map((brand: CategoryType) => <Card key={brand.id} className="h-64 m-2 border-2 shadow-md hover:shadow-xl transition-shadow duration-300">

                    <CardContent className="h-full flex flex-col ">
                        <Link
                            href={`/products?search=&brand=${brand.slug}`}

                        >
                            <div className="flex flex-col flex-grow justify-between text-center">
                                <Image
                                    src={
                                        brand.image
                                            ? `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${brand.image}`
                                            : "/altImage.jpg"
                                    }
                                    alt={brand.title}
                                    width={160}
                                    height={160}
                                    className="h-40 rounded-md object-contain"
                                />

                                <h2 className="mt-2 font-semibold ">{brand.title}</h2>


                            </div>
                        </Link>


                    </CardContent>

                </Card>)}
            </div>


        </div>
    )
}

export default BrandsSection