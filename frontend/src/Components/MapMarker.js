import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const MapMarker = ({ location, label, icon, onClick }) => {
  return (
    <Marker
      position={[location.lat, location.lng]}
      icon={icon}
      eventHandlers={{ click: onClick }}
    >
      <Popup>{label}</Popup>
    </Marker>
  );
};

export default MapMarker;
