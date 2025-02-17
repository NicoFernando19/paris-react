import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Products, { getServerSideProps } from '@/pages/products';
import { getProducts } from '@/services/Products';
import { Product } from '@/types/Product';

jest.mock('@/services/Products', () => ({
  getProducts: jest.fn(),
}));

describe('Products Page test', () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Product 1',
      images: ['https://example.com/image1.jpg'],
      price: 0,
      description: '',
      category: {
        id: 1,
        name: 'Category 1',
        image: 'https://example.com/category1.jpg',
      },
    },
  ];

  beforeEach(() => {
    (getProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches products in getServerSideProps', async () => {
    const context = {};
    const result = await getServerSideProps(context as any);
    expect(result).toEqual({
      props: {
        products: mockProducts,
      },
    });
  });

  it('render product correctly', () => {
    render(<Products products={mockProducts} />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });

  it('render product correctly', () => {
    render(<Products products={[]} />);
    expect(screen.getByText('No Products Available')).toBeInTheDocument();
  });
});
