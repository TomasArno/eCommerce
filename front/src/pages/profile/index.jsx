import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../state";


import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import CloseModal from "../../components/modal";

function Profile() {
  const [modal, setModal] = useState({ open: false, message: "" });

  const navigate = useNavigate();
  const { getState, fetchData } = useContext(GlobalContext);

  const { photo, name, email, id } = getState().user
  const handleSave = async (e) => {
    e.preventDefault();

    const formElements = e.currentTarget.elements;

    const data = {
      name: formElements.name.value,
      email: formElements.email.value,
    };

    await fetchData({ method: "PUT", url: `users/${id}`, data })
    setModal({ open: true, message: "Usuario modificado con exito" })
  }

  const handleCancel = () => {
    navigate("/")
  }

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
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Información personal</Typography>
          </Box>
          <Divider />
          <form onSubmit={handleSave}>
            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { xs: "flex", md: "flex" }, my: 1 }}
            >
              <Stack direction="column" spacing={1}>

                <AspectRatio
                  ratio="1"
                  maxHeight={200}
                  sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
                >
                  <img
                    src={photo}
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
                <IconButton
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: "background.body",
                    position: "absolute",
                    zIndex: 2,
                    borderRadius: "50%",
                    left: 100,
                    top: 170,
                    boxShadow: "sm",
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl
                    sx={{
                      display: { sm: "flex-column", md: "flex-row" },
                      gap: 2,
                    }}
                  >
                    <Input size="sm" defaultValue={name} name="name" />
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      size="sm"
                      type="email"
                      startDecorator={<EmailRoundedIcon />}
                      placeholder="nombre@dominio.com"
                      defaultValue={email}
                      sx={{ flexGrow: 1 }}
                      name="email"
                    />
                  </FormControl>
                </Stack>
              </Stack>
            </Stack>
            <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
              <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                <Button size="sm" variant="outlined" color="neutral" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button type="submit" size="sm" variant="solid">
                  Guardar
                </Button>
              </CardActions>
            </CardOverflow>
            {modal.open ? <CloseModal title={modal.message} onClose={() => setModal({ open: false, message: "" })} /> : ""}
          </form>
        </Card>
      </Stack >
    </Box >
  );
}

export default Profile;
