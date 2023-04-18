import { Box } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Box sx={{ backgroundColor: '#f3f6f9' }}>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Box>
  );
}

export default App;
