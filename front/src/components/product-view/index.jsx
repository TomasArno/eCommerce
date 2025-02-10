import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalStore from "../../state";
import {
  typographyClasses,
  Box,
  CssBaseline,
  Button,
  Divider,
  Typography,
  AspectRatio,
} from "@mui/joy";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ButtonCounter from "../button-counter";

function FullCard({ photos, title, price, stock }) {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(photos[0]);

  const { addProductInCart, productSelected } = GlobalStore();

  const handleCart = (e) => {
    const { id } = productSelected;

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

  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  return (
    <Box sx={{ width: "100%", p: "2rem " }}>
      <Box
        sx={(theme) => ({
          width: "fit-content",
          background: "#fbfcfe",
          borderRadius: "8px",
          border: "1px solid #cdd7e1",
          p: "1.7rem",
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          gap: 1,
          [theme.breakpoints.up(834)]: {
            gap: 2,
          },
          [theme.breakpoints.up(1199)]: {
            gap: 4,
          },
        })}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            height: "fit-content",
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
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              rowGap: "1rem",
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

            <Typography level="h3" textColor="text.secondary">
              $ {price}
            </Typography>

            <Box width={"100%"}>
              <Typography>Disponible: {stock}</Typography>
              <ButtonCounter
                sx={{ width: "fit-content", m: "0 auto" }}
                onClickAdd={handleAdd}
                onClickRemove={handleRemove}
                count={count}
              />
            </Box>

            <Box
              sx={{
                width: "80%",
                m: "0 auto",
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
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

        <Divider orientation="vertical" />

        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              mb: "0.7rem",
            }}
          >
            <AspectRatio
              ratio={16 / 9}
              variant="outlined"
              sx={{
                width: "700px",
                height: "400px",
                alignSelf: "stretch",
                borderRadius: "sm",
                objectFit: "cover",
                pointerEvents: "none",
              }}
            >
              <img src={selectedImage} alt="Producto" />
            </AspectRatio>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mr: "1rem",
              }}
            >
              {photos.map((photo, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: selectedImage === photo ? 4 : 1, // resaltar la imagen seleccionada
                    border: "1px solid", // Agregar un borde sutil
                    borderColor:
                      selectedImage === photo ? "primary.main" : "#cdd7e1", // Borde gris o azul para la selección
                    transition: "border-color 0.3s ease", // Transición suave cuando cambia el borde
                  }}
                  onClick={() => handleImageChange(photo)}
                >
                  <img
                    src={photo}
                    alt={`Imagen ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      pointerEvents: "none",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          <Box width={"700px"}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Esta es una descripción corta del producto. Aquí podrías poner
              detalles breves sobre las características del producto, como
              tamaño, color, material, etc.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Detalles adicionales */}
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Detalles del producto
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: 1, color: "text.secondary" }}
              >
                - Material: Algodón 100%
                <br />
                - Tamaño: M
                <br />
                - Color: Azul
                <br />- Garantía: 6 meses
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FullCard;
