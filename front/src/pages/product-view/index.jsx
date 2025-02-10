import { useNavigate } from "react-router-dom";

import GlobalStore from "../../state";

import FullCard from "../../components/product-view";

function ProducView() {
  const navigate = useNavigate();
  const { productSelected } = GlobalStore();
  const { photo, title, price, stock } = productSelected;

  window.addEventListener("load", () => {
    // solucion momentanea. Ver como pedir informacion y que re-renderize correctamente el componente
    navigate("/"); // pedir por el producto en la url
  });

  return (
    <FullCard
      photos={[photo, "/images/Favicon.png"]}
      title={title}
      price={price}
      stock={stock}
    />
  );
}

export default ProducView;
