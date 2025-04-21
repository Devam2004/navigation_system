import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import getIconByType from '../utils/getIconByType';

const MapMarker = ({ location }) => {
  const { name, type, coords } = location;

  return (
    <Marker position={[coords.lat, coords.lng]} icon={getIconByType(type)}>
      <Popup>
        <strong>{name}</strong><br />
        Type: {type}
      </Popup>
    </Marker>
  );
};

export default MapMarker;
