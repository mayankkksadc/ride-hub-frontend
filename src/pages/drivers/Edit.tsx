
import React from 'react';
import { useParams } from 'react-router-dom';

const DriverEdit = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Driver</h1>
      <p className="text-gray-500">Editing driver with ID: {id}</p>
    </div>
  );
};

export default DriverEdit;
