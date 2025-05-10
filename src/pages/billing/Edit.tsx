
import React from 'react';
import { useParams } from 'react-router-dom';

const BillingEdit = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Bill</h1>
      <p className="text-gray-500">Edit bill with ID: {id}</p>
    </div>
  );
};

export default BillingEdit;
