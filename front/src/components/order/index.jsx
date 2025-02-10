import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalStore from "../../state";

import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/joy";

import ButtonCounter from "../button-counter";

function OrderCard({
  id,
  photo,
  title,
  date,
  units,
  available,
  padding,
  height = 170,
  borderBottom = 2,
  button,
  handleDelete,
}) {
  const [count, setCount] = useState(units);
  const { state, removeProductFromCart, modifyQuantity } = GlobalStore();
  const navigate = useNavigate();

  function handleBtn() {
    const { isLoggedIn } = state;

    if (!isLoggedIn) {
      navigate("/login");
    }
  }

  const handleAdd = () => {
    const counterSmallerThanAvailable = count < available;

    if (counterSmallerThanAvailable) {
      setCount((c) => c + 1);
      modifyQuantity(id, count + 1);
    }
  };

  const handleRemove = () => {
    const oneUnitLeft = count == 1;

    setCount((c) => c - 1);

    if (oneUnitLeft) {
      removeProductFromCart(id);
      handleDelete();
    } else {
      modifyQuantity(id, count - 1);
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: { height },
        gap: 0,
        padding: { padding },
      }}
    >
      <Box sx={{ borderBottom: { borderBottom } }}>
        <Typography
          alignContent={"center"}
          paddingLeft={"20px"}
          level="body-sm"
          fontSize="lg"
          fontWeight="lg"
        >
          {date}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          margin: "20px",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", columnGap: "15px" }}>
          <Box sx={{ width: "100px" }} alignContent={"center"}>
            <AspectRatio ratio="4/3" sx={{ width: 100 }}>
              <img src={photo} loading="lazy" alt="" />
            </AspectRatio>
          </Box>

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
            orientation="horizontal"
          >
            <Typography level="title-lg">{title}</Typography>
            <Box>
              <Typography level="body-sm">
                {available ? `Disponible: ${available}` : `Unidades: ${units}`}
              </Typography>
            </Box>
          </CardContent>
        </Box>
        {button == "modifiers" ? (
          // corregir estilos
          <ButtonCounter
            onClickAdd={handleAdd}
            onClickRemove={handleRemove}
            count={count}
          />
        ) : (
          <Button
            variant="solid"
            size="md"
            onClick={handleBtn}
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
          >
            Agregar
          </Button>
        )}
      </Box>
    </Card>
  );
}

export default OrderCard;
