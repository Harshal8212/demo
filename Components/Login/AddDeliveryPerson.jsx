'use client';

import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, Truck, XCircle, Wallet } from 'lucide-react';
import { DeliveryContext } from '../../Context/DeliveryContext';

export default function AddDeliveryPerson() {
  const router = useRouter();
  const { registerDeliveryMan } = useContext(DeliveryContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    vehicleType: '',
    walletAddress: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = await registerDeliveryMan(
      formData.email,
      formData.phone,
      formData.vehicleType,
      formData.password
    );

    if (result.success) {
      setSuccess(result.message);
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        vehicleType: '',
        walletAddress: '',
      });
      setTimeout(() => window.location.reload(), 1000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Delivery Person</h1>
          <p className="mt-2 text-gray-600">Register a new delivery partner</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 sm:p-4 flex items-center" role="alert">
              <XCircle className="mr-2 flex-shrink-0" />
              <p className="text-sm sm:text-base">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 text-green-500 p-3 rounded-md text-sm">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email Address</label>
              <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="delivery@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block">Password</label>
              <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block">Confirm Password</label>
              <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 block">Phone Number</label>
              <div className="relative">
                
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

              {/* Vehicle Type */}
            <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 block">Vehicle Number</label>
                <div className="relative">
                        
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Truck className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                        id="vehicle Number"
                        type="vehicle Number"
                        value={formData.vehicleType}
                        onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="MH 17 ......"
                        />
                    </div>
                </div>
            </div>
        
    

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Create Delivery Person
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
