import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../utils/constants";

import { Box, Typography, Button, Divider } from "@mui/joy";

import Card from "../../components/card";

function SearchPanel() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
  });

  useEffect(() => {
    const { minPrice, maxPrice, category, orderBy } = filters;
    const searchQuery = location.pathname.split("/")[2];
    const filterParams = new URLSearchParams();

    filterParams.append("title", searchQuery);
    if (minPrice) filterParams.append("minPrice", minPrice);
    if (maxPrice) filterParams.append("maxPrice", maxPrice);
    if (category) filterParams.append("category", category);
    if (orderBy) filterParams.append("orderBy", orderBy);

    axios(`${apiUrl}/products?${filterParams.toString()}`)
      .then((res) => {
        const { statusCode } = res.data;

        if (statusCode === 200) {
          const products = res.data.response.docs;
          setProducts(products);
        }
      })
      .catch((err) => alert(err));
  }, [filters]);

  // Función para actualizar filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          border: "1px solid #cdd7e1",
          background: "#fbfcfe",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: 2,
        }}
      >
        <Typography level="h2" fontWeight="lg" mb={2}>
          Filtros de búsqueda
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography level="h3" fontSize="sm">
            Ordenar por
          </Typography>
          <select
            name="orderBy"
            value={filters.orderBy}
            onChange={handleFilterChange}
            style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
          >
            <option value="relevant">Mas relevantes</option>
            <option value="bigger">Menor precio</option>
            <option value="lower">Mayor precio</option>
          </select>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography level="h3" fontSize="sm">
            Rango de precio
          </Typography>
          <input
            type="number"
            name="minPrice"
            placeholder="Precio mínimo"
            value={filters.minPrice}
            onChange={handleFilterChange}
            style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Precio máximo"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography level="h3" fontSize="sm">
            Categorías
          </Typography>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
          >
            <option value="">Seleccionar categoría</option>
            <option value="electronics">Electrónica</option>
            <option value="clothing">Ropa</option>
            <option value="home">Hogar</option>
          </select>
        </Box>

        <Button
          sx={{ width: "100%" }}
          onClick={() =>
            setFilters({ minPrice: "", maxPrice: "", category: "" })
          }
        >
          Limpiar filtros
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          overflowX: "auto",
          flexWrap: "nowrap",
          pb: "10px",
        }}
      >
        {products.length === 0 ? (
          <Typography level="h4" textColor="text.secondary">
            No hay productos que coincidan con tu búsqueda.
          </Typography>
        ) : (
          products.map((prod) => (
            <Card
              key={prod._id}
              title={prod.title}
              stock={prod.stock}
              photo={prod.photo}
              price={prod.price}
            />
          ))
        )}
      </Box>
    </Box>
  );
}

export default SearchPanel;
