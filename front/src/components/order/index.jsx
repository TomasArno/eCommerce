import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/joy";

import { useContext } from "react";
import { GlobalContext } from "../../main";
import { useNavigate } from "react-router-dom";
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

      <Box sx={{ display: "flex", margin: "20px" }}>
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
          <ButtonCounter />
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
