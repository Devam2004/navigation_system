import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const locations = [
  { name: 'E Block', coords: [23.155484090902153, 72.66443198731419] },
  { name: 'F Block', coords: [23.15555459881238, 72.66352980335378] },
  { name: 'D Block', coords: [23.155451201666224, 72.66561961674674] },
  { name: 'C Block', coords: [23.154732918877396, 72.66687090740923] },
  { name: 'Mess', coords: [23.15710418558723, 72.6660361248536] },
  { name: 'Girls Hostel', coords: [23.15687477975353, 72.66676745431035] },
  { name: 'E ground', coords: [23.156513820935235, 72.66513130541756] }
];

const pdeuCoords = [23.15637, 72.66509];

const Routing = ({ from, to }) => {
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
      createMarker: () => null,
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [from, to, map]);

  return null;
};

// Dynamic icon generator based on type
const getCustomIcon = (type = '') => {
  let iconUrl = `${process.env.PUBLIC_URL}/leaflet/marker-block.png`;
  const lowerType = type.toLowerCase();

  if (lowerType.includes('mess')) {
    iconUrl = `${process.env.PUBLIC_URL}/leaflet/marker-mess.png`;
  } else if (lowerType.includes('library')) {
    iconUrl = `${process.env.PUBLIC_URL}/leaflet/marker-library.png`;
  }

  return new L.Icon({
    iconUrl,
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -40],
    shadowUrl: `${process.env.PUBLIC_URL}/leaflet/marker-shadow.png`,
    shadowSize: [41, 41],
  });
};

// Default user location marker
const userIcon = new L.Icon({
  iconUrl: `${process.env.PUBLIC_URL}/leaflet/marker-icon.png`,
  shadowUrl: `${process.env.PUBLIC_URL}/leaflet/marker-shadow.png`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowSize: [41, 41],
});

const CampusMap = () => {
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [blockDetailsMap, setBlockDetailsMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBlockDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/locations');
        const map = {};
        response.data.forEach(block => {
          map[block.name] = block;
        });
        setBlockDetailsMap(map);
      } catch (error) {
        console.error('Error fetching block details:', error);
      }
    };

    fetchAllBlockDetails();

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        setLocation({ lat: pdeuCoords[0], lng: pdeuCoords[1] });
      }
    );
  }, []);

  const handleSelect = (e) => {
    const loc = locations.find((l) => l.name === e.target.value);
    if (loc) {
      setSelectedLocation({ lat: loc.coords[0], lng: loc.coords[1] });
    }
  };

  const handleMarkerClick = (blockName) => {
    navigate(`/block-details/${encodeURIComponent(blockName)}`);
  };

  if (!location?.lat || !location?.lng) {
    return <p>Loading map...</p>;
  }

  return (
    <div>
      <select onChange={handleSelect} style={{ margin: '10px', padding: '6px', borderRadius: '6px' }}>
        <option value="">Select destination block</option>
        {locations.map((l) => (
          <option key={l.name} value={l.name}>{l.name}</option>
        ))}
      </select>

      <MapContainer center={[location.lat, location.lng]} zoom={17} style={{ height: '100vh', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[location.lat, location.lng]} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>

        {locations.map((loc) => {
          const type = blockDetailsMap[loc.name]?.type || 'Academic'; // fallback if type not loaded
          return (
            <Marker
              key={loc.name}
              position={loc.coords}
              icon={getCustomIcon(type)}
              eventHandlers={{ click: () => handleMarkerClick(loc.name) }}
            >
              <Popup>
                <strong>{loc.name}</strong><br />
                {type}
              </Popup>
            </Marker>
          );
        })}

        {selectedLocation && <Routing from={location} to={selectedLocation} />}
      </MapContainer>
    </div>
  );
};

export default CampusMap;
