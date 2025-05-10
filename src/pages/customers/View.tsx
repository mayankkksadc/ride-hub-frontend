
import React from 'react';
import { useParams } from 'react-router-dom';

const CustomerView = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Customer Details</h1>
      <p className="text-gray-500">Viewing customer with ID: {id}</p>
    </div>
  );
};

export default CustomerView;
