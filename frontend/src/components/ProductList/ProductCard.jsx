import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function ProductCard({ product }) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '800px',
        padding: '10px',

      }}
    >
      <Box
        sx={{
          width: '100px',
        }}
      >
        <CardMedia
          component="img"
          height={100}
          alt={product.description}
          image={product.image}
          title={product.description}
          sx={{ objectFit: 'contain' }}
        />
      </Box>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          height: '100px',
          width: '100%',
        }}
      >
        <Typography gutterBottom variant="p" component="div">
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.price}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          justifySelf: 'flex-end',
        }}
      >
        <Button
          sx={{ width: '150px' }}
          variant="contained"
          onClick={() => window.open(product.url, '_blank')}
        >
          Ver na loja
        </Button>
      </CardActions>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
