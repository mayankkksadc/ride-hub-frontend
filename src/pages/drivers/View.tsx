
import React from 'react';
import { useParams } from 'react-router-dom';

const DriverView = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Driver Details</h1>
      <p className="text-gray-500">Viewing driver with ID: {id}</p>
    </div>
  );
};

export default DriverView;
