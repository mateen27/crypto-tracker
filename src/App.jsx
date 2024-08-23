import { styled } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HomeScreen from './Screens/HomeScreen'
import CryptoScreen from './Screens/CryptoScreen'

function App() {
  // styling the application using mui's styled utility
  const AppContainer = styled('div')({
    backgroundColor: '#14161a',
    color: '#f1f1f1',
    minHeight: '100vh',
  });

  // routes of the application where the user has to go
  const router = createBrowserRouter([
    {
      path: '/',
      exact: true,
      element: <HomeScreen />
    },
    {
      path: '/crypto/:id',
      exact: true,
      element: <CryptoScreen />
    }
  ])

  return (
    <AppContainer>
      <Header />
      <RouterProvider router={router} />
    </AppContainer>
  )
}

export default App;
