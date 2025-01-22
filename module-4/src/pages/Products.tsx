import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/Products';
import { Product } from '../types';
import CustomCarousel from '../components/Carousel';
import { CarouselItem } from '../components/ui/carousel';
import { NavLink } from 'react-router-dom';
import Card from '../components/Card';
import InputField from '../components/InputField';
import useDebounce from '../hooks/Debounce';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filterTitle, setFilterTitle] = useState<string>('');
    const debouncedValue = useDebounce(filterTitle, 500);

    useEffect(() => {
        fetchData();
    }, [debouncedValue])

    const fetchData = async () => {
        const datas = await getProducts(filterTitle);
        if (datas.length > 0) {
            setProducts(datas)
        }
    }

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterTitle(e.target.value);
    }

    return (
        <section>
            <div className='container mx-auto my-4'>
                <div className='flex flex-wrap justify-center'>
                    <div className='w-1/2'>
                        <InputField 
                            id='title'
                            name='title'
                            type='text'
                            placeholder='Filter'
                            className='p-1'
                            value={filterTitle}
                            onChange={handleFilter}
                        />
                    </div>
                </div>
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