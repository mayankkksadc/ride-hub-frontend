
import React from 'react';
import { useParams } from 'react-router-dom';

const AdminReviewDriver = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Review Driver</h1>
      <p className="text-gray-500">Review driver with ID: {id}</p>
    </div>
  );
};

export default AdminReviewDriver;
