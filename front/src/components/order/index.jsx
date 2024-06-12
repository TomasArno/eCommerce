import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../main";

import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/joy";

import ButtonCounter from "../button-counter";

function OrderCard({
  photo,
  state,
  title,
  units,
  date,
  padding,
  height = 170,
  borderBottom = 2,
  button,
}) {
  const [count, setCount] = useState(units);
  const { getState } = useContext(GlobalContext);
  const navigate = useNavigate();

  function handleBtn() {
    const { isLoggedIn } = getState();
    if (isLoggedIn) {
      ("");
    } else {
      navigate("/login");
    }
  }

  const handleAdd = () => {
    setCount((c) => (c < units ? c + 1 : c));
  };
  const handleRemove = () => {
    setCount((c) => (c > 0 ? c - 1 : 0));
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

      <Box sx={{ display: "flex", margin: "20px", justifyContent: "space-between" }}>
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
            <Typography level="title-lg">{state}</Typography>
            <Box>
              <Typography level="body-sm">{title}</Typography>
              <Typography level="body-sm">Unidades: {units}</Typography>
            </Box>
          </CardContent>
        </Box>
        {button == "modifiers" ? (
          // corregir estilos
          <ButtonCounter onClickAdd={handleAdd} onClickRemove={handleRemove} count={count} />
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
