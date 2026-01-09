import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex gap-4 p-4">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2 flex-1">
            {product.description}
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className="text-lg">${product.price.toFixed(2)}</span>
            <Button onClick={() => onAddToCart(product)} size="sm">
              <Plus className="size-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}