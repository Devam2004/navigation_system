import L from 'leaflet';

const customIcon = (type = '') => {
  let iconUrl = '/leaflet/marker-block.png'; // Default icon for academic blocks

  const lowerType = type.toLowerCase();
  if (lowerType.includes('mess')) {
    iconUrl = '/leaflet/marker-mess.png';
  } else if (lowerType.includes('library')) {
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

export default customIcon;
