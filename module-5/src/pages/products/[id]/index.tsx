import Card from '@/components/common/Card';
import CustomCarousel from '@/components/common/CustomCarousel';
import { CarouselItem } from '@/components/ui/carousel';
import { getProducts, getProductsById } from '@/services/Products';
import { Product } from '@/types/Product';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface ProductDetailProps {
    product: Product
}

const ProductDetail: React.FC<ProductDetailProps> = ({product}) => {
    const router = useRouter();

    if(router.isFallback){
        return <div>Loading...</div>
    }
    
    return (
        <div className='flex flex-wrap justify-center mt-4'>
            <Card className='w-1/4'>
                <Card.Header>
                    <CustomCarousel>
                        {product.images?.map((image, idx) => (
                            <CarouselItem className='pl-0 w-1/4' key={idx}>
                                <Image src={image} alt='image' width={300} height={300} />
                            </CarouselItem>
                        ))}
                    </CustomCarousel>
                </Card.Header>
                <h2 className='text-black font-bold'>{product.title}</h2>
                <span className='text-black'>{product.description}</span>
            </Card>
        </div>
    )
}

export default ProductDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    const datas = await getProducts()
    let products: Product[] = [];
    if (datas.length > 0){
        products = datas
    }

    const paths = products.map((product) => ({
        params: { id: product.id.toString() }
    }))

    return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const data = await getProductsById(params?.id as string)
    const product: Product = data;

    return {
        props: {
            product
        },
        revalidate: 60 //in seconds
    }
}
