import { Box, Typography, IconButton } from "@mui/joy";
import { Remove, Add } from "@mui/icons-material";

function ButtonCounter({ onClickAdd, onClickRemove, count }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        background: "#ddd",
        padding: "10px",
        borderRadius: "6px",
      }}
    >
      Cantidad:
      <IconButton size="sm" variant="outlined" onClick={onClickRemove}>
        <Remove />
      </IconButton>
      <Typography fontWeight="md" textColor="text.secondary">
        {count}
      </Typography>
      <IconButton size="sm" variant="outlined" onClick={onClickAdd}>
        <Add />
      </IconButton>
    </Box>
  );
}

export default ButtonCounter;
