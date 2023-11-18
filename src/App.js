import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreatePolygonPage from './pages/CreatePolygon';
import PolygonsPage from './pages/PolygonsPage';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<PolygonsPage/>} />
      <Route path='/createpolygon' element={<CreatePolygonPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
