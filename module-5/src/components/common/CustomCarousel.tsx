import { 
    Carousel, 
    CarouselContent,
    CarouselNext,
    CarouselPrevious
} from '../ui/carousel'

interface CardCarouselProps {
    children: React.ReactNode
}

const CustomCarousel: React.FC<CardCarouselProps> = ({ children }) => {
    return (
        <Carousel className="w-full">
            <CarouselContent className='-ml-2 md:-ml-4'>
                {children}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default CustomCarousel;