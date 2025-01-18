import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsById } from '../services/Products';
import { Product } from '../types';
import Card from '../components/Card';
import CustomCarousel from '../components/Carousel';
import { CarouselItem } from '../components/ui/carousel';

const ProductDetail = () => {
    const [product, setProduct] = useState<Partial<Product>>({})
    const { productId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProductsById(productId)
            if (data) {
                setProduct(data)
            }
        }
        fetchData()
    }, [])

    return (
        <section>
            <div className='w-full'>
                <div className='container mx-auto my-4 p-4'>
                    <div className='flex flex-wrap justify-center'>
                        <Card className='w-1/2'>
                            <Card.Header>
                                <CustomCarousel>
                                    {product.images?.length > 0 && product.images?.map((image, idx) => (
                                        <CarouselItem key={idx}>
                                            <img src={image} />
                                        </CarouselItem>
                                    ))}
                                </CustomCarousel>
                            </Card.Header>
                            <p className='font-semibold text-2xl my-4'>{product.title}</p>
                            <p className='my-4'>{product.description}</p>
                            <p className='font-bold text-xl'>${product.price}</p>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetail;