
import React from 'react';
import { useParams } from 'react-router-dom';

const RideEdit = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Ride</h1>
      <p className="text-gray-500">Editing ride with ID: {id}</p>
    </div>
  );
};

export default RideEdit;
