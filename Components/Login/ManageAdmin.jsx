'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Search } from 'lucide-react';
import { AdminContext } from '../../Context/AdminContext';
import { DeliveryContext } from '../../Context/DeliveryContext';
import AddAdmin from './AddAdmin'; // AddAdmin Component
import AddDeliveryPerson from './AddDeliveryPerson'; // AddDeliveryPerson Component

export default function ManageEntities() {
  const router = useRouter();
  const { getAllAdmins, removeAdminByEmail } = useContext(AdminContext);
  const { getAllDeliveryMen, removeDeliveryManByEmail } = useContext(DeliveryContext);
  const [admins, setAdmins] = useState([]);
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddDeliveryForm, setShowAddDeliveryForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadAdmins();
    loadDeliveryPersons();
  }, []);

  const loadAdmins = async () => {
    const result = await getAllAdmins();
    if (result) {
      setAdmins(result);
    }
  };

  const loadDeliveryPersons = async () => {
    const result = await getAllDeliveryMen();
    if (result) {
      setDeliveryPersons(result);
    }
  };

  const handleRemoveAdmin = async (email) => {
    if (window.confirm('Are you sure you want to remove this admin?')) {
      const result = await removeAdminByEmail(email);
      setMessage({
        type: result ? 'success' : 'error',
        text: result ? 'Admin removed successfully' : 'Failed to remove admin'
      });

      if (result) {
        loadAdmins();
      }

      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const filteredAdmins = admins.filter(admin =>
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.storeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveDeliveryPerson = async (email) => {
    if (window.confirm('Are you sure you want to remove this delivery person?')) {
      const result = await removeDeliveryManByEmail(email);
      setMessage({
        type: result ? 'success' : 'error',
        text: result ? 'Delivery person removed successfully' : 'Failed to remove delivery person'
      });

      if (result) {
        loadDeliveryPersons();
      }

      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const filteredDeliveryPersons = deliveryPersons.filter(person =>
    person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.vehicleType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50" >
      <div className=" py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Manage Administrators</h1>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                {showAddForm ? 'Cancel' : <><Plus size={20} /> Add Admin</>}
              </button>
            </div>

            {/* Message Display */}
            {message.text && (
              <div className={`p-4 rounded-md mb-4 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message.text}
              </div>
            )}

            {/* Add Admin Form */}
            {showAddForm && <AddAdmin loadAdmins={loadAdmins} setMessage={setMessage} />}

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search admins..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Admins List */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remove</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAdmins.map((admin, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{admin.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{admin.storeName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{admin.phoneNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleRemoveAdmin(admin.email)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Persons Section */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 mt-12 ">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Manage Delivery Persons</h1>
              <button
                onClick={() => setShowAddDeliveryForm(!showAddDeliveryForm)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                {showAddDeliveryForm ? 'Cancel' : <><Plus size={20} /> Add Delivery Person</>}
              </button>
            </div>

            {/* Message Display */}
            {message.text && (
              <div className={`p-4 rounded-md mb-4 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message.text}
              </div>
            )}

            {/* Add Delivery Person Form */}
            {showAddDeliveryForm && <AddDeliveryPerson loadDeliveryPersons={loadDeliveryPersons} setMessage={setMessage} />}

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search delivery persons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Delivery Persons List */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remove</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDeliveryPersons.map((person, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{person.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{person.vehicleType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{person.phoneNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleRemoveDeliveryPerson(person.email)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
