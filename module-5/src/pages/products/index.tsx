import Card from '@/components/common/Card';
import CustomCarousel from '@/components/common/CustomCarousel';
// import InputField from '@/components/common/InputField';
import { CarouselItem } from '@/components/ui/carousel';
import { getProducts } from '@/services/Products';
import { Product } from '@/types/Product';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductsProps {
    products: Product[]
}

const Products: React.FC<ProductsProps> = ({ products }) => {
    return (
        <section>
            <div className='container mx-auto my-4'>
                <div className='flex flex-wrap justify-center'>
                    <div className='w-1/2'>
                        {/* <InputField 
                            id='title'
                            name='title'
                            type='text'
                            placeholder='Filter'
                            className='p-1'
                            value={filterTitle}
                            onChange={handleFilter}
                        /> */}
                    </div>
                </div>
                <div className='flex flex-wrap justify-center'>
                    {products.length > 0 && products.map((product, idx) => (
                        <Link className='w-1/5' key={idx} href={`/products/${product.id}`}>
                            <Card className='m-6 bg-slate-300'>
                                <Card.Header>
                                    <CustomCarousel>
                                        {product.images?.map((image, idx) => (
                                            <CarouselItem className='pl-0 w-1/4' key={idx}>
                                                <Image src={image} alt='image' width={300} height={300} />
                                            </CarouselItem>
                                        ))}
                                    </CustomCarousel>
                                </Card.Header>
                                <h2 className='text-black'>{product.title}</h2>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Products;

//Pada saat browser membuka alamat /products
//server side akan berjalan untuk melakukan fetching data/pengambilan data melalui endpoint/api
//kemudian apabila data tersebut berhasil didapatkan akan melakukan return object
//yang kemudian object tersebut akan dipakai di client component page ini
export const getServerSideProps: GetServerSideProps = async () => {
    const products = await getProducts();
    if (!products) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            products
        }
    }
}