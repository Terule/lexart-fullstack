import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ data }) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        gap: '15px',
      }}
    >
      {data.products.map((product) => (
        <ProductCard key={product.url} product={product} />
      ))}
    </Container>
  );
}

ProductList.propTypes = {
  data: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default ProductList;
