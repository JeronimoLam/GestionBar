import React from 'react';
import SearchBar from '../../components/searchbar/Searchbar.tsx';

const Productos = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for products with:', query);
    // Aquí puedes agregar lógica de búsqueda o filtrar productos
  };

  return (
    <div>
      <h1>Productos</h1>
      <p>Busca entre los productos disponibles:</p>
      <SearchBar onSearch={handleSearch} />
      {/* Agrega más contenido aquí si lo necesitas */}
    </div>
  );
};

export default Productos;
