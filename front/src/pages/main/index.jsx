import { useEffect, useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../state";

import Card from "../../components/card";
import Carousel from "../../components/carousel";

import { Box } from "@mui/joy";

function Index() {
  const { fetchData } = useContext(GlobalContext);
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
          gap: "1rem",
          p: "3rem",
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
  );
}

export default Index;
