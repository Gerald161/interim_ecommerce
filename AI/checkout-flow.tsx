import React, { useState } from 'react';
import { Trash2, Plus, Minus, Edit2, MapPin } from 'lucide-react';

const CheckoutFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Eau De Perfume for Men',
      price: 10.68,
      quantity: 1,
      image: '/api/placeholder/80/80',
      category: 'Fragrance'
    },
    {
      id: 2,
      name: 'NARS Makeup Kit',
      price: 80.00,
      quantity: 1,
      image: '/api/placeholder/80/80',
      category: 'Cosmetics'
    }
  ]);

  const [customerDetails, setCustomerDetails] = useState({
    firstName: 'Sarah',
    lastName: 'Davis',
    email: 'mail@pagedone.com',
    phone: '00000 00000',
    street: 'Alpha Plus A-1002, Raiya Telephone Exchange',
    postalCode: '380005',
    city: 'Rajkot',
    country: 'India',
    paymentMethod: 'card',
    cardNumber: 'XXXX XXXX XXXX 4568',
    expiryDate: '08/2027',
    cvv: '000'
  });

  const [discountCode, setDiscountCode] = useState('WELCOME123');
  const [orderId] = useState('356925420');

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = 8.00;
  const taxes = 22.00;
  const discount = 12.00;
  const total = subtotal + shipping + taxes - discount;

  const steps = [
    { number: 1, name: 'Cart', active: currentStep >= 1 },
    { number: 2, name: 'Delivery & Payment', active: currentStep >= 2 },
    { number: 3, name: 'Summary', active: currentStep >= 3 },
    { number: 4, name: 'Done', active: currentStep >= 4 }
  ];

  // Cart Page
  const CartPage = () => (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-start gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${item.price.toFixed(2)}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 mt-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-80">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Charge</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Discount Code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="w-full p-3 border rounded-lg mb-2"
              />
              <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700">
                Apply
              </button>
            </div>
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Checkout Details Page
  const CheckoutPage = () => (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-start gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name *</label>
                  <input
                    type="text"
                    value={customerDetails.firstName}
                    onChange={(e) => setCustomerDetails({...customerDetails, firstName: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={customerDetails.lastName}
                    onChange={(e) => setCustomerDetails({...customerDetails, lastName: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number *</label>
                  <div className="flex">
                    <select className="px-3 py-3 border rounded-l-lg bg-gray-50">
                      <option>IN</option>
                    </select>
                    <input
                      type="text"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                      className="flex-1 p-3 border-t border-r border-b rounded-r-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Shipping Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Street Address *</label>
                  <input
                    type="text"
                    value={customerDetails.street}
                    onChange={(e) => setCustomerDetails({...customerDetails, street: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Postal Code *</label>
                    <input
                      type="text"
                      value={customerDetails.postalCode}
                      onChange={(e) => setCustomerDetails({...customerDetails, postalCode: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">City *</label>
                    <input
                      type="text"
                      value={customerDetails.city}
                      onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country *</label>
                    <select
                      value={customerDetails.country}
                      onChange={(e) => setCustomerDetails({...customerDetails, country: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                    >
                      <option>India</option>
                      <option>USA</option>
                      <option>UK</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={customerDetails.paymentMethod === 'paypal'}
                    onChange={(e) => setCustomerDetails({...customerDetails, paymentMethod: e.target.value})}
                    className="mr-2"
                  />
                  Paypal
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={customerDetails.paymentMethod === 'card'}
                    onChange={(e) => setCustomerDetails({...customerDetails, paymentMethod: e.target.value})}
                    className="mr-2"
                  />
                  Credit or Debit Card
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={customerDetails.paymentMethod === 'cod'}
                    onChange={(e) => setCustomerDetails({...customerDetails, paymentMethod: e.target.value})}
                    className="mr-2"
                  />
                  COD
                </label>
              </div>
              
              {customerDetails.paymentMethod === 'card' && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Card Number *</label>
                    <input
                      type="text"
                      value={customerDetails.cardNumber}
                      onChange={(e) => setCustomerDetails({...customerDetails, cardNumber: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV *</label>
                    <input
                      type="text"
                      value={customerDetails.cvv}
                      onChange={(e) => setCustomerDetails({...customerDetails, cvv: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">Expiry Date *</label>
                    <input
                      type="text"
                      value={customerDetails.expiryDate}
                      onChange={(e) => setCustomerDetails({...customerDetails, expiryDate: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back to Cart
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Continue to Summary
            </button>
          </div>
        </div>
        
        <div className="w-80">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-gray-500 text-xs">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-6 h-6 rounded border flex items-center justify-center">
                    <Minus size={12} />
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button className="w-6 h-6 rounded border flex items-center justify-center">
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))}
            <hr className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Charge</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Summary Page
  const SummaryPage = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
        <p className="text-gray-600">Order ID: {orderId}</p>
        <p className="text-gray-600">Thank you. Your order has been Confirmed.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="border rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4">Items Ordered</h3>
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"></div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Order Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Charge</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="border rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Customer</h3>
              <Edit2 size={16} className="text-gray-400" />
            </div>
            <p className="text-gray-700">{customerDetails.firstName} {customerDetails.lastName}</p>
            <p className="text-gray-500 text-sm">1 Order</p>
          </div>

          <div className="border rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Customer Information</h3>
              <Edit2 size={16} className="text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm mb-1">{customerDetails.email}</p>
            <p className="text-gray-600 text-sm">+91 {customerDetails.phone}</p>
          </div>

          <div className="border rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Shipping Address</h3>
              <Edit2 size={16} className="text-gray-400" />
            </div>
            <p className="text-gray-700">{customerDetails.firstName} {customerDetails.lastName}</p>
            <p className="text-gray-600 text-sm">{customerDetails.street}</p>
            <p className="text-gray-600 text-sm">{customerDetails.city}, {customerDetails.country} {customerDetails.postalCode}</p>
            <p className="text-blue-600 text-sm mt-2 flex items-center gap-1">
              <MapPin size={14} />
              select on map
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-3">Billing Address</h3>
            <p className="text-gray-600">Same as shipping address</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => setCurrentStep(2)}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back to Details
        </button>
        <button
          onClick={() => setCurrentStep(4)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );

  // Thank You Page
  const ThankYouPage = () => (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">✓</span>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-4">Your order has been successfully placed.</p>
        <p className="text-lg font-semibold text-gray-800">Order ID: #{orderId}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="font-semibold mb-4">Order Details</h3>
        <div className="flex justify-between items-center mb-2">
          <span>Order Date</span>
          <span>Nov 28, 2023</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>Delivery Date</span>
          <span>Dec 01, 2023</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>Payment Method</span>
          <span>Credit Card</span>
        </div>
        <div className="flex justify-between items-center font-semibold">
          <span>Total Amount</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-gray-600 mb-4">
          We'll send you a confirmation email with tracking details shortly.
        </p>
        <p className="text-sm text-gray-500">
          Shipping Address: {customerDetails.street}, {customerDetails.city}, {customerDetails.country} {customerDetails.postalCode}
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setCurrentStep(1)}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Continue Shopping
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Track Order
        </button>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentStep) {
      case 1:
        return <CartPage />;
      case 2:
        return <CheckoutPage />;
      case 3:
        return <SummaryPage />;
      case 4:
        return <ThankYouPage />;
      default:
        return <CartPage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Steps */}
      <div className="border-b bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold cursor-pointer ${
                    step.active
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                  onClick={() => setCurrentStep(step.number)}
                >
                  {step.number}
                </div>
                <span
                  className={`ml-2 cursor-pointer ${
                    step.active ? 'text-green-600 font-semibold' : 'text-gray-500'
                  }`}
                  onClick={() => setCurrentStep(step.number)}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="py-8">
        {renderCurrentPage()}
      </div>
    </div>
  );
};

export default CheckoutFlow;