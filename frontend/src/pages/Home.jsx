import { Container } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import ProductList from '../components/ProductList/ProductList';
import SearchBar from '../components/SearchBar/SearchBar';

function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    website: 'todas',
    category: 'geladeira',
    query: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  /*
    Uses axios instead of fetch to make the request to the backend. uses abortController to
    cancel the request if the user clicks the button again before the request is finished.
    Users fields to make the body of the request.
  */
  const handleClick = async () => {
    setIsLoading(true);
    const abortController = new AbortController();
    const { signal } = abortController;
    const json = await axios.post('http://localhost:3001/search', fields, { signal })
      .then((response) => response.data)
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.warn('Request aborted');
        } else {
          console.error(error);
        }
      });

    setData(json);
    setIsLoading(false);
  };

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      minHeight: '100vh',
    }}
    >
      <SearchBar
        handleClick={handleClick}
        handleChange={handleChange}
        fields={fields}
        isLoading={isLoading}
      />
      {(!isLoading && data) && <ProductList data={data} />}
    </Container>
  );
}

export default Home;
