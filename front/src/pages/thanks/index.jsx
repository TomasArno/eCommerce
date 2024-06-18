import { useNavigate } from "react-router-dom";

import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";

function Thanks() {
  const navigate = useNavigate();

  return (
    <Box id={123} sx={{ flex: 1, width: "100%", background: "#ddd" }}>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 10 },
        }}
      >
      </Stack >
    </Box >
  );
}

export default Thanks;
