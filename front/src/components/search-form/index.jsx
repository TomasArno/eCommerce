import GlobalStore from "../../state";
import { useNavigate } from "react-router-dom";

import Link from "@mui/joy/Link";
import Badge from "@mui/joy/Badge";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import ShoppingCartCheckout from "@mui/icons-material/ShoppingCartCheckout";
import { Box } from "@mui/joy";

import SidePanelOptions from "../user-list";
import Button from "../button";

import "./index.css";

function SearchForm() {
  const { cartItems } = GlobalStore();

  const navigate = useNavigate();
  // validar que sea mayor a cero
  const handleSearch = (e) => {
    e.preventDefault();

    const searchBoxData = document.querySelector("#search-input");
    navigate(`/search/${searchBoxData.value}`); // manejar que si le da a enter rediriga
  };

  const handleCart = (e) => {
    e.preventDefault();

    navigate(`/cart`);
  };

  return (
    <div className="search-box_container">
      <Link component="a" underline="none" onClick={() => navigate("/")}>
        <Typography fontSize="xl">
          <img
            style={{ height: "30px" }}
            src="/images/Favicon.png"
            alt="Logo.png"
          />
        </Typography>
      </Link>
      <form className="search-form">
        <Input
          slotProps={{
            input: { id: "search-input" },
          }}
          className="search-input"
          sx={{ width: "100%", background: "#eee" }}
          size="sm"
          placeholder="Buscar productos"
          variant="plain"
        />
        <Button
          handler={handleSearch}
          content="Buscar"
          className="search-btn"
        />
      </form>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <SidePanelOptions />
        <Badge
          component={"a"}
          size="sm"
          onClick={handleCart}
          sx={{ color: "black", cursor: "pointer" }}
          badgeContent={cartItems.length}
        >
          <ShoppingCartCheckout />
        </Badge>
      </Box>
    </div>
  );
}
// ver como mantener el carrito si me muevo de pagina
export default SearchForm;
