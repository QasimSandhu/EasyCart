import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardsDetail from './components/CardsDetail';
import Cards from './components/Cards';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Cards />} />
        <Route path='/card-detail/:id' element={<CardsDetail />} />
      </Routes>
    </>
  );
}

export default App;
