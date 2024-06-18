import { useNavigate } from "react-router-dom";

import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from '@mui/joy/Typography';

function Thanks() {
  const navigate = useNavigate();

  setTimeout(() => navigate("/"), 3000)
  
  return (
    <Box id={123} sx={{ flex: 1, width: "100%", background: "#ddd" }}>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          alignItems: "center",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 10 },
        }}
      >
        <Typography level="h1">¡MUCHAS GRACIAS POR SU COMPRA!</Typography>
        <Typography level="h3">Será redirido a la página principal</Typography>
      </Stack >
    </Box >
  );
}

export default Thanks;
