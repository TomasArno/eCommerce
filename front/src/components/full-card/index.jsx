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

  const { addProductInCart, getState } = useContext(GlobalContext);

  const handleCart = (e) => {
    const { id } = getState().productSelected

    addProductInCart(id, count);
    if (e.target.id == "buy") navigate("/cart");
    else navigate("/")
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
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        py: 15,
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
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
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
          <Box>
            <Typography>Disponible: {stock}</Typography>
            <ButtonCounter
              onClickAdd={handleAdd}
              onClickRemove={handleRemove}
              count={count}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
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
        ratio={4 / 3}
        variant="outlined"
        maxHeight={350}
        sx={(theme) => ({
          minWidth: 300,
          maxWidth: 500,
          alignSelf: "stretch",
          [theme.breakpoints.up(834)]: {
            alignSelf: "initial",
            flexGrow: 1,
            "--AspectRatio-maxHeight": "400px",
            "--AspectRatio-minHeight": "320px",
          },
          borderRadius: "sm",
          flexBasis: "50%",
        })}
      >
        <img src={photo} alt="" />
      </AspectRatio>
    </Container>
  );
}

export default FullCard;
