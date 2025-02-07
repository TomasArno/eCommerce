import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../../state";

import FullCard from "../../components/product-view";
import { Box } from "@mui/joy";

function ProducView() {
  const navigate = useNavigate();
  const { state } = useContext(GlobalContext);
  const { photo, title, price, stock } = state.productSelected;

  window.addEventListener("load", () => {
    // solucion momentanea. Ver como pedir informacion y que re-renderize correctamente el componente
    navigate("/"); // pedir por el producto en la url
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <FullCard photo={photo} title={title} price={price} stock={stock} />
    </Box>
  );
}

export default ProducView;
