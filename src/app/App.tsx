import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ProductCard, type Product } from './components/ProductCard';
import { CartDrawer, type CartItem } from './components/CartDrawer';
import { CheckoutForm } from './components/CheckoutForm';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Jasmine Rice',
    description: 'Premium Thai jasmine rice, 5kg bag, fragrant and fluffy',
    price: 12.99,
    category: 'Pantry',
    image: 'https://images.unsplash.com/photo-1706760601886-9b2754f9342a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXNtaW5lJTIwcmljZSUyMGJhZ3xlbnwxfHx8fDE3Njc5NDAzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '2',
    name: 'Instant Noodles',
    description: 'Pack of 5 instant ramen noodles, assorted flavors',
    price: 3.99,
    category: 'Pantry',
    image: 'https://images.unsplash.com/photo-1627811884715-c004fc2dd6fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YW50JTIwbm9vZGxlcyUyMGFzaWFufGVufDF8fHx8MTc2Nzk0MDM2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '3',
    name: 'Soy Sauce',
    description: 'Premium light soy sauce, 500ml, naturally brewed',
    price: 4.49,
    category: 'Condiments',
    image: 'https://images.unsplash.com/photo-1760368104122-2d7917d9f8ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3klMjBzYXVjZSUyMGJvdHRsZXxlbnwxfHx8fDE3Njc4MzkyNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '4',
    name: 'Bok Choy',
    description: 'Fresh bok choy, 500g bunch, great for stir-fry',
    price: 2.99,
    category: 'Produce',
    image: 'https://images.unsplash.com/photo-1601091760588-b9cf83b19297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2slMjBjaG95JTIwdmVnZXRhYmxlfGVufDF8fHx8MTc2Nzg4NjYzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '5',
    name: 'Fresh Tofu',
    description: 'Silken tofu, 300g pack, perfect for soups and stews',
    price: 2.49,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1661349008073-136bed6e6788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2Z1JTIwYmxvY2t8ZW58MXx8fHwxNzY3OTQwMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '6',
    name: 'Fresh Fish Fillet',
    description: 'Sea bass fillet, 500g, sustainably sourced',
    price: 14.99,
    category: 'Seafood',
    image: 'https://images.unsplash.com/photo-1674066616794-60459a88bbb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZpc2glMjBtYXJrZXR8ZW58MXx8fHwxNzY3ODU3ODU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '7',
    name: 'Pork Dumplings',
    description: 'Frozen pork dumplings, 20pcs, ready to steam or pan-fry',
    price: 8.99,
    category: 'Frozen',
    image: 'https://images.unsplash.com/photo-1648726443433-d5a62ba13863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGR1bXBsaW5nc3xlbnwxfHx8fDE3Njc4NDUwODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '8',
    name: 'Sesame Oil',
    description: 'Pure sesame oil, 250ml, aromatic and flavorful',
    price: 6.99,
    category: 'Condiments',
    image: 'https://images.unsplash.com/photo-1708861617671-0d201a7b0ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXNhbWUlMjBvaWwlMjBib3R0bGV8ZW58MXx8fHwxNzY3ODY4MjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '9',
    name: 'Fresh Ginger',
    description: 'Fresh ginger root, 200g, perfect for Asian cooking',
    price: 1.99,
    category: 'Produce',
    image: 'https://images.unsplash.com/photo-1763019228611-b2bce31c89d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaW5nZXIlMjByb290JTIwZnJlc2h8ZW58MXx8fHwxNzY3OTA0Nzk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '10',
    name: 'Coconut Milk',
    description: 'Premium coconut milk, 400ml can, rich and creamy',
    price: 3.49,
    category: 'Pantry',
    image: 'https://images.unsplash.com/photo-1587890767851-e9bc526764b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NvbnV0JTIwbWlsayUyMGNhbnxlbnwxfHx8fDE3Njc5NDAzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '11',
    name: 'Chinese Cabbage',
    description: 'Fresh napa cabbage, whole head, great for kimchi or stir-fry',
    price: 3.99,
    category: 'Produce',
    image: 'https://images.unsplash.com/photo-1665525928337-7e5b116bf82a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwY2FiYmFnZXxlbnwxfHx8fDE3Njc5NDAzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '12',
    name: 'Fresh Prawns',
    description: 'Large prawns, 500g, peeled and deveined',
    price: 16.99,
    category: 'Seafood',
    image: 'https://images.unsplash.com/photo-1759244566095-d6047dfde9c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF3biUyMHNocmltcCUyMHNlYWZvb2R8ZW58MXx8fHwxNzY3OTQwMzY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '13',
    name: 'Fresh Milk',
    description: 'Whole milk, 1 gallon, fresh from local dairy farms',
    price: 4.99,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1625055930088-4424bb0806dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeXxlbnwxfHx8fDE3Njc5MzgxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '14',
    name: 'Free Range Eggs',
    description: 'Large brown eggs, dozen, cage-free',
    price: 5.99,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1570802685082-2224bd954723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGVnZ3N8ZW58MXx8fHwxNzY3OTM4OTE0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '15',
    name: 'Chicken Breast',
    description: 'Fresh boneless skinless chicken breast, per lb',
    price: 7.99,
    category: 'Meat',
    image: 'https://images.unsplash.com/photo-1642497394469-188b0f4bcae6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbWVhdCUyMGZyZXNofGVufDF8fHx8MTc2Nzg2NTE2Mnww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

const CATEGORIES = ['All', 'Produce', 'Seafood', 'Meat', 'Dairy', 'Pantry', 'Condiments', 'Frozen'];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return PRODUCTS;
    }
    return PRODUCTS.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCartItems((current) => {
      const existingItem = current.find((item) => item.id === product.id);
      
      if (existingItem) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        }
      ];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    
    setCartItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckout(true);
  };

  const handleBackToShopping = () => {
    setIsCheckout(false);
    setIsCartOpen(true);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setIsCheckout(false);
  };

  if (isCheckout) {
    return (
      <CheckoutForm
        items={cartItems}
        onBack={handleBackToShopping}
        onSubmit={handleOrderComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <Header cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />

      {/* Products Section */}
      <section className="px-4 py-4">
        <div className="mb-4">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto gap-2">
              {CATEGORIES.map((category) => (
                <TabsTrigger key={category} value={category} className="whitespace-nowrap">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}