import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../state";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import CloseModal from "../../components/modal";

function ProductsForm() {
  const [modal, setModal] = useState({ open: false, message: "" });

  const navigate = useNavigate();
  const { fetchData } = useContext(GlobalContext);

  const handleSave = async (e) => {
    e.preventDefault();

    const formElements = e.currentTarget.elements;

    const data = {
      title: formElements.title.value,
      price: formElements.price.value,
      stock: formElements.stock.value,
      photo: formElements.photo.value,
    };

    const res = await fetchData({ method: "POST", url: `products/`, data })

    if (res?.statusCode == 201) {
      setModal({ open: true, message: "Producto creado con exito!" })
    } else {
      setModal({ open: true, message: res?.response })
    }
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
            <Typography level="title-md">Nuevo producto</Typography>
          </Box>
          <Divider />
          <form onSubmit={handleSave}>
            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { xs: "flex", md: "flex" }, my: 1 }}
            >
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl
                    sx={{
                      display: { sm: "flex-column", md: "flex-row" },
                      gap: 2,
                    }}
                  >
                    <Input size="sm" name="title" />
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Precio</FormLabel>
                    <Input
                      size="sm"
                      type="number"
                      sx={{ flexGrow: 1 }}
                      name="price"
                    />
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Stock</FormLabel>
                    <Input
                      size="sm"
                      type="number"
                      sx={{ flexGrow: 1 }}
                      name="stock"
                    />
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Foto</FormLabel>
                    <Input
                      size="sm"
                      type="text"
                      sx={{ flexGrow: 1 }}
                      name="photo"
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

export default ProductsForm;
