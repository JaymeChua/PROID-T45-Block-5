import { useState } from 'react';
import { ArrowLeft, CheckCircle, Truck, Store } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import type { CartItem } from './CartDrawer';

interface CheckoutFormProps {
  items: CartItem[];
  onBack: () => void;
  onSubmit: () => void;
}

export function CheckoutForm({ items, onBack, onSubmit }: CheckoutFormProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === 'delivery' ? 2.99 : 0;
  const tax = total * 0.08;
  const grandTotal = total + deliveryFee + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center border-0 shadow-none">
          <CardContent className="pt-6 space-y-6">
            <div className="mb-4 flex justify-center">
              <div className="size-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="size-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your order will be {deliveryMethod === 'delivery' ? 'delivered' : 'ready for pickup'} soon
            </p>
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <p>Total: <span className="font-medium">${grandTotal.toFixed(2)}</span></p>
              <p>{deliveryMethod === 'delivery' ? 'Delivery' : 'Ready'}: <span className="font-medium">30-45 min</span></p>
            </div>
            <Button onClick={onSubmit} size="lg" className="w-full">
              Done
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 border-b bg-white px-4 py-3">
        <Button
          variant="ghost"
          onClick={onBack}
          size="sm"
          className="pl-0"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="size-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Form */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Info</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Delivery Method */}
              <div className="space-y-3">
                <Label>Delivery Method</Label>
                <RadioGroup
                  value={deliveryMethod}
                  onValueChange={(value) => setDeliveryMethod(value as 'delivery' | 'pickup')}
                  className="grid grid-cols-2 gap-3"
                >
                  <label
                    htmlFor="delivery"
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 cursor-pointer transition-colors ${
                      deliveryMethod === 'delivery'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <RadioGroupItem value="delivery" id="delivery" className="sr-only" />
                    <Truck className="size-6 text-green-600" />
                    <div className="text-center">
                      <p className="text-sm">Delivery</p>
                      <p className="text-xs text-gray-500">$2.99</p>
                    </div>
                  </label>

                  <label
                    htmlFor="pickup"
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 cursor-pointer transition-colors ${
                      deliveryMethod === 'pickup'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <RadioGroupItem value="pickup" id="pickup" className="sr-only" />
                    <Store className="size-6 text-green-600" />
                    <div className="text-center">
                      <p className="text-sm">Pickup</p>
                      <p className="text-xs text-gray-500">Free</p>
                    </div>
                  </label>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>

              {deliveryMethod === 'delivery' && (
                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address, apt, city, state, zip"
                    rows={2}
                    required
                  />
                </div>
              )}

              {deliveryMethod === 'pickup' && (
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  <p className="text-gray-700 mb-1">Pickup Location:</p>
                  <p className="text-gray-600">123 Main Street, Store #1</p>
                  <p className="text-gray-600">Open 8am - 9pm daily</p>
                </div>
              )}

              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Special instructions"
                  rows={2}
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Place Order
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}