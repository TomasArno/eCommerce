// import { useState, useEffect } from 'react';
// import axios from 'axios';
import { useContext, useState } from "react";
import { GlobalContext } from "../../main";

import CardContent from "@mui/joy/CardContent";
import { Box } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/joy";
import ArrowForward from "@mui/icons-material/ArrowForward";

import Product from "../../components/order";

function Cart() {
  const { getState } = useContext(GlobalContext);
  const [cart, setCart] = useState(getState().cartItems)

  const handleDelete = () => {
    setCart(getState().cartItems)
  }

  let units = 0;
  let total = 0;

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      columnGap={"30px"}
      padding={"30px 60px"}
      sx={{ width: "100%", height: "100%", background: "#ddd" }}
    >
      {
        cart.length ?
          <>
            <Box sx={{ width: "60%", maxWidth: "800px" }}>
              {cart.map((product, i) => {
                units += product.quantity;
                total += 15 * product.quantity;

                return (
                  <Product
                    id={product.id}
                    button="modifiers"
                    height={120}
                    borderBottom={0}
                    key={i}
                    state={product.title}
                    units={product.quantity}
                    date={""}
                    photo={product.photo}
                    padding={0}
                    handleDelete={handleDelete}
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
                      Total: <span>${total}</span>
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", rowGap: "5px" }}
                  >
                    <Button
                      sx={{ background: "green" }}
                      onClick={() => { }}
                      size="lg"
                      endDecorator={<ArrowForward fontSize="xl" />}
                    >
                      Comprar ahora
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </> : "" // agregar logo mas prolijo
      }
    </Box>
  );
}

export default Cart;
