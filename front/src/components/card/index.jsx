import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

import Button from "../button";

import GlobalStore from "../../state";
import { useNavigate } from "react-router-dom";

function BasicCard({ id, photo, title, price, stock }) {
  const { isLoggedIn, setState } = GlobalStore();
  const navigate = useNavigate();

  function handleBtn() {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const productSelected = { id, photo, title, price, stock };
      setState({ productSelected });

      navigate(`/products/${id}`);
    }
  }

  return (
    <Card
      id={id}
      sx={{
        width: 220,
        height: 270,
        flexShrink: 0,
      }}
    >
      <div>
        <Typography level="title-lg">{title}</Typography>
        <Typography level="body-sm">Disponible: {stock}</Typography>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img src={photo} loading="lazy" alt="" />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-sm">Precio</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            ${price}
          </Typography>
        </div>
        <Button content="Ver" handler={handleBtn} height="10px" width="40%" />
      </CardContent>
    </Card>
  );
}

export default BasicCard;
