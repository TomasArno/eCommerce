import { useEffect } from "react";
import GlobalStore from "../../state";

import {
  offersStore,
  bestSellersStore,
  featuredsStore,
} from "../../store/products";

import { Box, Typography, Link } from "@mui/joy";
import Card from "../../components/card";
import Carousel from "../../components/carousel";

function Index() {
  const { fetchData } = GlobalStore();
  const { productsOffers, setOffers } = offersStore();
  const { productsBestSellers, setBestSellers } = bestSellersStore();
  const { productsFeatureds, setFeatureds } = featuredsStore();

  useEffect(() => {
    const handleFetch = async () => {
      const offers = await fetchData({
        url: "products",
        query: { isFeatured: true },
      });
      const bestSellers = await fetchData({
        url: "products",
        query: { bestSellers: true },
      });
      const featureds = await fetchData({
        url: "products",
        query: { discount: true },
      });

      if (offers?.statusCode == 200) {
        const { docs } = offers.response;

        setOffers(docs);
      }

      if (bestSellers?.statusCode == 200) {
        const { docs } = bestSellers.response;

        setBestSellers(docs);
      }

      if (featureds?.statusCode == 200) {
        const { docs } = featureds.response;

        setFeatureds(docs);
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
          {productsOffers.map((prod) => (
            <Card
              key={prod._id}
              id={prod._id}
              title={prod.title}
              stock={prod.stock}
              photo={prod.photo}
              price={prod.price}
            />
          ))}
          {productsOffers.map((prod) => (
            <Card
              key={prod._id}
              id={prod._id}
              title={prod.title}
              stock={prod.stock}
              photo={prod.photo}
              price={prod.price}
            />
          ))}
          {productsOffers.map((prod) => (
            <Card
              key={prod._id}
              id={prod._id}
              title={prod.title}
              stock={prod.stock}
              photo={prod.photo}
              price={prod.price}
            />
          ))}
          {productsOffers.map((prod) => (
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
          {productsBestSellers.map((prod) => (
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
          {productsFeatureds.map((prod) => (
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
