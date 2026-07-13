import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
      <h1 className="text-4xl font-black text-black mb-4">Order Confirmed!</h1>
      <p className="text-lg text-gray-600 mb-2">Thank you for your purchase.</p>
      <p className="text-md text-gray-500 mb-10">Your Order ID is: <span className="font-bold text-black">{orderId}</span></p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to={`/track`} className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
          Track Order
        </Link>
        <Link to="/" className="bg-white border border-black text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;