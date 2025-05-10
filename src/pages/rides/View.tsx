
import React from 'react';
import { useParams } from 'react-router-dom';

const RideView = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ride Details</h1>
      <p className="text-gray-500">Viewing ride with ID: {id}</p>
    </div>
  );
};

export default RideView;
