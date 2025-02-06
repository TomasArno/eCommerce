import CarouselUI from "react-material-ui-carousel";
import { Box, CardMedia, Card } from "@mui/material";

export default function Carousel() {
  const items = [
    {
      img: "https://picsum.photos/1000/350",
      title: "Producto 1",
      description: "Descripción del producto 1",
    },
    {
      img: "https://picsum.photos/1000/350",
      title: "Producto 2",
      description: "Descripción del producto 2",
    },
    {
      img: "https://picsum.photos/1000/350",
      title: "Producto 3",
      description: "Descripción del producto 3",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: 350, // Altura fija para evitar estiramientos
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CarouselUI
        animation="slide"
        interval={4000}
        navButtonsAlwaysVisible
        indicators={false}
        sx={{
          width: "100%",
          height: 350, // Fijamos la altura del carrusel
        }}
      >
        {items.map((item, index) => (
          <Card
            key={index}
            sx={{
              width: "100%",
              height: "100%", // Asegura que el Card respete la altura del carrusel
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <CardMedia
              component="img"
              alt={item.title}
              image={item.img}
              sx={{
                width: "100%",
                height: 350, // Mantiene la imagen dentro del tamaño del carrusel
                objectFit: "cover", // Evita deformaciones
              }}
            />
          </Card>
        ))}
      </CarouselUI>
    </Box>
  );
}
