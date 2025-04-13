import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CampusMap from './Components/CampusMap';
import BlockDetailsPage from './Components/BlockDetailsPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CampusMap />} />
        <Route path="/block-details/:blockName" element={<BlockDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
