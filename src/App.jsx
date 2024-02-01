import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { MantineProvider, createTheme, Button} from '@mantine/core';
import Navbar from './composants/Navbar';
import Home from './roots/Home';
import Planning from './roots/Planning';
import Profil from './roots/Profil';
import Login from './roots/Login';
import Register from './roots/Register';


const theme = createTheme({
  colors: {
    primary: ['#FF5733', '#FF8C33', '#FFAB33'],
    secondary: ['#3366FF', '#339DFF', '#33BBFF'],
    text: ['#333333', '#666666', '#999999'],
    background: ['#FFFFFF', '#F5F5F5', '#E0E0E0'],
  },
  fontFamily: 'Arial, sans-serif',
  borderRadius: '8px',
  shadows: {
    base: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'blue',
        variant: 'outline',
      },
    }),
  },
});

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route englobant les pages nÃ©cessitant la Navbar */}
        <Route
          path="/home/*"
          element={
            <MantineProvider theme={{
              fontFamily: 'Open Sans, sans-serif',
              
              lineHeight: 1.2,
              primaryColor: 'green',
              secondaryColor: 'blue',}}
              >
              <>
                <Navbar />
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/planning" element={<Planning />} />
                  <Route path="/profil" element={<Profil />} />
                </Routes>
              </>
            </MantineProvider>
          }
        />

        {/* Route spÃ©cifique pour la page de connexion */}
        <Route path="/login" element={<Login />} />

        {/* Route pour la page d'inscription */}
        <Route path="/register" element={<Register />} />

        {/* Redirection vers /login par dÃ©faut */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
