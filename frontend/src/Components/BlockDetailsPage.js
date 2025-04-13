import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlockDetailsPage = () => {
  const { blockName } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchBlockDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/buildings/${encodeURIComponent(blockName)}`);
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching block details:', error);
      }
    };

    fetchBlockDetails();
  }, [blockName]);

  if (!details) return <p>Loading details for {blockName}...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{blockName}</h2>
      <p><strong>Floors:</strong> {Array.isArray(details.floors) ? details.floors.join(', ') : details.floors}</p>
      <p><strong>Capacity:</strong> {details.capacity}</p>
      <p><strong>Opening Hours:</strong> {details.openingHours}</p>
      <p><strong>Features:</strong> {details.features?.join(', ')}</p>
    </div>
  );
};

export default BlockDetailsPage;
