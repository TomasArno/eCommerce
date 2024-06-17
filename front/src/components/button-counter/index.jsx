import { Box, Typography, IconButton } from "@mui/joy";
import { Remove, Add } from "@mui/icons-material";

function ButtonCounter({ onClickAdd, onClickRemove, count, sx }) {
  return (
    <Box
      sx={{
        borderColor: "orange",
        alignSelf: "center",
        borderRadius: "6px",
        ...sx
      }}
    >
      <Box display={"flex"} columnGap={"15px"} border="1px solid #ddd" borderRadius={"6px"} >
        <IconButton sx={{ border: "none" }} size="sm" variant="outlined" onClick={onClickRemove}>
          <Remove />
        </IconButton>
        <Typography alignSelf={"center"} fontWeight="md" textColor="text.secondary">
          {count}
        </Typography>
        <IconButton sx={{ border: "none" }} size="sm" variant="outlined" onClick={onClickAdd}>
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
}

export default ButtonCounter;
