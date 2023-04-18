import {
  Box,
  Button,
  CircularProgress,
  FormControl, InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function SearchBar({
  fields, handleClick, handleChange, isLoading,
}) {
  return (
    <Paper
      elevation={1}
      sx={{
        marginTop: '10px',
        width: 'fit-content',
        padding: '10px',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FormControl>
        <InputLabel id="web">Website</InputLabel>
        <Select
          name="website"
          size="small"
          onChange={handleChange}
          labelId="web"
          value={fields.website}
          label="Website"
          sx={{ width: '200px' }}
          required
        >
          <MenuItem value="todas">Todas</MenuItem>
          <MenuItem value="buscape">Buscape</MenuItem>
          <MenuItem value="mercadoLivre">Mercado Livre</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="category">Category</InputLabel>
        <Select
          name="category"
          size="small"
          onChange={handleChange}
          labelId="category"
          value={fields.category}
          label="Category"
          sx={{ width: '200px' }}
          required
        >
          <MenuItem value="geladeira">Geraleira</MenuItem>
          <MenuItem value="tv">TV</MenuItem>
          <MenuItem value="celular">Celular</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          name="query"
          size="small"
          placeholder="Digite algo para buscar"
          value={fields.query}
          onChange={handleChange}
          sx={{ width: '250px' }}
          required
          error={fields.query === ''}
        />
      </FormControl>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant="contained"
          type="button"
          onClick={handleClick}
          disabled={isLoading}
        >
          Buscar
        </Button>
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Paper>
  );
}

SearchBar.propTypes = {
  fields: PropTypes.shape({
    website: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SearchBar;
