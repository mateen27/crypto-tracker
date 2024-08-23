import { Routes, Route } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Header from './components/Header';
import HomeScreen from './Screens/HomeScreen';
import CryptoScreen from './Screens/CryptoScreen';

function App() {
  // styling the application using mui's styled utility
  const AppContainer = styled('div')({
    backgroundColor: '#14161a',
    color: '#f1f1f1',
    minHeight: '100vh',
  });

  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/crypto/:id" element={<CryptoScreen />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
