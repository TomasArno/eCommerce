// import { useState, useEffect } from 'react';
// import axios from 'axios';
import { useContext } from "react";
import { GlobalContext } from "../../main";

import Order from "../../components/order";
import CardContent from "@mui/joy/CardContent";
import { Box } from "@mui/joy";
import Typography from "@mui/joy/Typography";

function Cart() {
  const { getState } = useContext(GlobalContext);
  const { cartItems } = getState();

  const cart = [
    {
      title: "un tituñp",
      quantity: 5,
      state: "pending",
      photo: "https://picsum.photos/200/300",
    },
    {
      title: "Otro producto",
      quantity: 5,
      state: "pending",
      photo: "https://picsum.photos/200/300",
    },
  ];

  // const [orders, setOrders] = useState([]);

  // useEffect(() => {
  // 	axios('http://localhost:8080/api/orders')
  // 		.then((res) => {
  // 			if (res.data.response)
  // 				setOrders(res.data.response.docs);
  // 		})
  // 		.catch((err) => console.log(err));
  // }, []);

  return (
    <Box
      display={"flex"}
      columnGap={"30px"}
      padding={"30px 60px"}
      sx={{ width: "100%", height: "100%", background: "#ddd" }}
    >
      <Box sx={{ width: "60%" }}>
        {cart.map((order, i) => (
          <Order
            height={120}
            borderBottom={0}
            key={i}
            state={order.title}
            units={order.quantity}
            date={""}
            photo={order.photo}
            padding={0}
          />
        ))}
      </Box>
      <Box sx={{ width: "30%", maxHeight: "300px" }}>
        <CardContent
          sx={{
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

          <Box padding={"1rem"}>
            <Typography paddingBottom={"10px"} level="body-sm">
              Unidades: {}
            </Typography>
            <Typography
              color="black"
              level="body-sm"
              fontSize="xl"
              fontWeight="xl"
              display={"flex"}
              justifyContent={"space-between"}
            >
              Total: <span>${100000}</span>
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Box>
  );
}

export default Cart;
