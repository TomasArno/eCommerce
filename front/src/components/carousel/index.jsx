import CarouselUI from "react-material-ui-carousel";
import { Paper } from "@mui/material";

export default function Carousel() {
  const items = [
    {
      imgSrc: "https://picsum.photos/800/300",
      alt: "Oferta 1",
    },
    {
      imgSrc: "https://picsum.photos/800/300",
      alt: "Oferta 2",
    },
    {
      imgSrc: "https://picsum.photos/800/300",
      alt: "Oferta 3",
    },
  ];

  return (
    <CarouselUI
      autoPlay={true}
      interval={5000} // Intervalo de 5 segundos
      animation="slide" // Animación de deslizamiento
      navButtonsAlwaysVisible={true} // Los botones de navegación siempre visibles
      indicators={true} // Los indicadores (puntos) visibles
      cycleNavigation={true} // Vuelve al primer slide cuando llega al último
      navButtonsProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Color de fondo de los botones de navegación
          color: "white", // Color de los íconos
          borderRadius: "50%", // Hacemos los botones circulares
          padding: "10px", // Aumentamos el tamaño de los botones
        },
      }}
    >
      {items.map((item, index) => (
        <Paper
          key={index}
          style={{
            minHeight: "150px",
            maxHeight: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black", // Fondo negro para hacer destacar la imagen
            borderRadius: 0,
            boxShadow: "none",
          }}
        >
          <img
            src={item.imgSrc}
            alt={item.alt}
            style={{
              objectFit: "cover", // Hace que la imagen cubra todo el espacio sin distorsionarse
            }}
          />
        </Paper>
      ))}
    </CarouselUI>
  );
}
