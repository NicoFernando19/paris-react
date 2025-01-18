import { useEffect, useState } from 'react';
import { getProducts } from '../services/Products';
import { Product } from '../types';
import CustomCarousel from '../components/Carousel';
import { CarouselItem } from '../components/ui/carousel';
import { NavLink } from 'react-router-dom';
import Card from '../components/Card';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const datas = await getProducts();
        if (datas.length > 0) {
            setProducts(datas)
        }
    }

    return (
        <section>
            <div className='container mx-auto my-4'>
                <div className='flex flex-wrap justify-center'>
                    <CustomCarousel>
                        {products.length > 0 && products.map((product, idx) => (
                            <CarouselItem key={idx} className='pl-0 m-14 basis-1/3'>
                                <NavLink to={`/products/${product.id}`}>
                                    <Card>
                                        <Card.Header>
                                            <CustomCarousel>
                                                {product.images?.map((image, idx) => (
                                                    <CarouselItem key={idx}>
                                                        <img src={image} />
                                                    </CarouselItem>
                                                ))}
                                            </CustomCarousel>
                                        </Card.Header>
                                        <h2>{product.title}</h2>
                                    </Card>
                                </NavLink>
                            </CarouselItem>
                        ))}
                    </CustomCarousel>
                </div>
            </div>
        </section>
    )
}

export default Products;