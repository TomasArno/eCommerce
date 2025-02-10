import { useEffect, useState } from "react";
import GlobalStore from "../../state";

import { Box, Typography, Link } from "@mui/joy";
import Card from "../../components/card";
import Carousel from "../../components/carousel";

function Index() {
  const { fetchData } = GlobalStore();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      const data = await fetchData({ url: "products" });

      if (data?.statusCode == 200) {
        const { docs } = data.response;

        setProducts(docs);
      }
    };

    handleFetch();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Carousel />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          p: "2rem 3rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <Typography fontWeight={"bold"} mr={"13px"} pb={"17px"} level="h3">
            Ofertas
          </Typography>
          <Typography pb={"17px"} level="body-sm">
            <Link>Ver todas las ofertas</Link>
          </Typography>
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
          {products.map((prod) => (
            <Card
              key={prod._id}
              id={prod._id}
              title={prod.title}
              stock={prod.stock}
              photo={prod.photo}
              price={prod.price}
            />
          ))}
          {products.map((prod) => (
            <Card
              key={prod._id}
              id={prod._id}
              title={prod.title}
              stock={prod.stock}
              photo={prod.photo}
              price={prod.price}
            />
          ))}
          {products.map((prod) => (
            <Card
              key={prod._id}
              id={prod._id}
              title={prod.title}
              stock={prod.stock}
              photo={prod.photo}
              price={prod.price}
            />
          ))}
          {products.map((prod) => (
            <Card
              key={prod._id}
              id={prod._id}
              title={prod.title}
              stock={prod.stock}
              photo={prod.photo}
              price={prod.price}
            />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          p: "3rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <Typography fontWeight={"bold"} mr={"13px"} pb={"17px"} level="h3">
            Lo más vendido
          </Typography>
          <Typography pb={"17px"} level="body-sm">
            <Link>Ver todos los más vendidos</Link>
          </Typography>
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
          {products.map((prod) => (
            <Card
              key={prod._id}
              id={prod._id}
              title={prod.title}
              stock={prod.stock}
              photo={prod.photo}
              price={prod.price}
            />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          p: "3rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <Typography fontWeight={"bold"} mr={"13px"} pb={"17px"} level="h3">
            Productos Destacados
          </Typography>
          <Typography pb={"17px"} level="body-sm">
            <Link>Ver todos los destacados</Link>
          </Typography>
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
          {products.map((prod) => (
            <Card
              key={prod._id}
              id={prod._id}
              title={prod.title}
              stock={prod.stock}
              photo={prod.photo}
              price={prod.price}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Index;
