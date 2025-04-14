// BlockDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlockDetailsPage = () => {
  const { blockName } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchBlockDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/locations/${encodeURIComponent(blockName)}`);
        console.log('Block details fetched:', response.data);
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
      <h2>{details.name}</h2>
      <p><strong>Type:</strong> {details.type}</p>
      <p><strong>Description:</strong> {details.description}</p>
      <p><strong>Floors:</strong> {details.floors?.map(floor => `Floor ${floor.floor}: ${floor.features.join(', ')}`).join('; ')}</p>
      <p><strong>Capacity:</strong> {details.capacity}</p>
      <p><strong>Has AC:</strong> {details.hasAC ? 'Yes' : 'No'}</p>
      <p><strong>Accessible:</strong> {details.accessible ? 'Yes' : 'No'}</p>
      <p><strong>Features:</strong> {details.features?.join(', ')}</p>
      <p><strong>Opening Hours:</strong> {JSON.stringify(details.openingHours)}</p>
    </div>
  );
};

export default BlockDetailsPage;
