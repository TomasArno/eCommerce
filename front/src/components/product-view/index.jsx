import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../../state";

import { typographyClasses } from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import ArrowForward from "@mui/icons-material/ArrowForward";
import AspectRatio from "@mui/joy/AspectRatio";
import Container from "@mui/joy/Container";

import ButtonCounter from "../button-counter";

function FullCard({ photo, title, price, stock }) {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const { addProductInCart, state } = useContext(GlobalContext);

  const handleCart = (e) => {
    const { id } = state.productSelected;

    addProductInCart(id, count);
    if (e.target.id == "buy") navigate("/cart");
    else navigate("/");
  };

  const handleAdd = () => {
    setCount((c) => (c < stock ? c + 1 : c));
  };

  const handleRemove = () => {
    setCount((c) => (c > 0 ? c - 1 : 0));
  };

  return (
    <Container
      sx={(theme) => ({
        background: "red",
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        [theme.breakpoints.up(834)]: {
          gap: 6,
        },
        [theme.breakpoints.up(1199)]: {
          gap: 12,
        },
      })}
    >
      <Box
        sx={(theme) => ({
          background: "orange",
          height: "100%",
          display: "flex",
          gap: "1rem",
          maxWidth: "50ch",
          flexShrink: 999,
          [theme.breakpoints.up(834)]: {
            minWidth: 420,
          },
          [`& .${typographyClasses.root}`]: {
            textWrap: "balance",
          },
        })}
      >
        <CssBaseline />
        <Box
          sx={{
            background: "yellow",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              background: "green",
            }}
          >
            <Typography
              alignSelf={"start"}
              color="primary"
              fontSize="sm"
              fontWeight="lg"
            >
              MARCA
            </Typography>
            <Typography
              level="h1"
              fontWeight="xl"
              fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            >
              {title}
            </Typography>
          </Box>
          <Typography level="h3" textColor="text.secondary" lineHeight="lg">
            $ {price}
          </Typography>
          <Box
            sx={{
              background: "purple",
            }}
          >
            <Typography>Disponible: {stock}</Typography>
            <ButtonCounter
              onClickAdd={handleAdd}
              onClickRemove={handleRemove}
              count={count}
            />
          </Box>

          <Box
            sx={{
              background: "gray",
              display: "flex",
              flexDirection: "column",
              rowGap: "5px",
            }}
          >
            <Button
              id="buy"
              onClick={handleCart}
              size="lg"
              endDecorator={<ArrowForward fontSize="xl" />}
            >
              Comprar ahora
            </Button>
            <Button
              id="add"
              onClick={handleCart}
              size="lg"
              variant="soft"
              endDecorator={<ArrowForward fontSize="xl" />}
            >
              Agregar al carrito
            </Button>
          </Box>
        </Box>
      </Box>
      <AspectRatio
        ratio={16 / 9} // Mantén la proporción de 16:9 si deseas una forma rectangular
        variant="outlined"
        sx={{
          display: "flex", // Centra la imagen
          width: "700px", // Aumento el ancho para hacer la imagen un poco más ancha
          height: "800px", // Hago que la imagen sea el doble de alta
          alignSelf: "stretch",
          borderRadius: "sm", // Bordes redondeados
          objectFit: "cover", // Asegura que la imagen cubra el área sin distorsionarse
        }}
      >
        <img src={photo} alt="" />
      </AspectRatio>
    </Container>
  );
}

export default FullCard;
