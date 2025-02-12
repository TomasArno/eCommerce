import { useEffect, useState } from "react";
import GlobalStore from "../../state";

import { CardContent, Box, Link, Typography, Button } from "@mui/joy";
import ArrowForward from "@mui/icons-material/ArrowForward";

import Product from "../../components/order";

function NoContent() {
  return (
    <Box
      sx={{
        width: "60%",
      }}
    >
      <CardContent
        sx={{
          borderRadius: "8px",
          background: "#fbfcfe",
          display: "flex",
          alignItems: "end",
        }}
        orientation="horizontal"
      >
        <Typography
          color="black"
          padding={"1rem"}
          borderBottom={"1px solid #ddd"}
          alignContent={"center"}
          level="h1"
          fontSize="lg"
          fontWeight="lg"
        >
          Nada por aquí..
        </Typography>

        <Typography padding={"1rem"} level="body-sm">
          <Link>Ver todas las novedades</Link>
        </Typography>
      </CardContent>
    </Box>
  );
}

function Cart() {
  const { fetchData, setState, cartItems } = GlobalStore();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const handleFetch = async () => {
      const data = await fetchData({ url: "orders" });
      const dataAmount = await fetchData({ url: "tickets" });

      if (data?.statusCode == 200 && dataAmount?.statusCode == 200) {
        const { docs } = data.response;
        const { total } = dataAmount.response[0];

        setAmount(total);
        setState({ cartItems: docs });
      }
    };

    handleFetch();
  }, []);

  const handleBuy = async () => {
    const data = await fetchData({ method: "POST", url: "payments/checkout" });

    if (data.statusCode == 201) {
      const { url } = data.response;

      location.href = url;
    }
  };

  let units = 0;

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      columnGap={"30px"}
      padding={"30px 60px"}
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 200px)",
        // background: "#ddd",
      }}
    >
      {cartItems.length ? (
        <>
          <Box sx={{ width: "60%", maxWidth: "800px" }}>
            {cartItems.map((order) => {
              units += order.quantity;

              const { quantity, _id } = order;
              const { title, photo, stock } = order.productId;

              return (
                <Product
                  key={_id}
                  id={_id}
                  button="modifiers"
                  height={120}
                  borderBottom={0}
                  title={title}
                  units={quantity}
                  available={stock}
                  date={""}
                  photo={photo}
                  padding={0}
                  handleDelete={() => {}}
                />
              );
            })}
          </Box>
          <Box sx={{ width: "30%", maxWidth: "360px", height: "240px" }}>
            <CardContent
              sx={{
                height: "100%",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                background: "#fbfcfe",
              }}
              orientation="horizontal"
            >
              <Typography
                color="black"
                padding={"1rem"}
                borderBottom={"1px solid #ddd"}
                alignContent={"center"}
                level="h2"
                fontSize="lg"
                fontWeight="lg"
              >
                Resumen de compra
              </Typography>
              <Box
                height={"100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                padding={"1rem"}
              >
                <Box marginTop={"10px"}>
                  <Typography fontSize="sm" level="body-sm">
                    Unidades: {units}
                  </Typography>
                  <Typography
                    color="black"
                    level="body-sm"
                    fontSize="xl"
                    fontWeight="xl"
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    Total: <span>${amount}</span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "5px",
                  }}
                >
                  <Button
                    sx={{ background: "green" }}
                    onClick={handleBuy}
                    size="lg"
                    endDecorator={<ArrowForward fontSize="xl" />}
                  >
                    Comprar ahora
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Box>
        </>
      ) : (
        <NoContent />
      )}
    </Box>
  );
}

export default Cart;
