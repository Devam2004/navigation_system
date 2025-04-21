import L from 'leaflet';

const getIconByType = (type) => {
  let iconUrl = '/leaflet/marker-block.png'; // default

  if (type.toLowerCase().includes('mess')) {
    iconUrl = '/leaflet/marker-mess.png';
  } else if (type.toLowerCase().includes('library')) {
    iconUrl = '/leaflet/marker-library.png';
  }

  return new L.Icon({
    iconUrl,
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -40],
    shadowUrl: '/leaflet/marker-shadow.png',
    shadowSize: [50, 50],
    className: 'custom-leaflet-icon',
  });
};

export default getIconByType;
