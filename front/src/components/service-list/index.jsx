import { List, ListItem, ListItemButton, Divider } from "@mui/joy";

const listItems = [
  <Divider key={1}>Combos</Divider>,
  "Disponibles",
  "Arma tu combo",
  <Divider key={2}>Computadoras</Divider>,
  "Servidores",
  "Escritorio",
  "Laptops",
  <Divider key={3}>Periféricos</Divider>,
  "Monitores",
  "Parlantes",
  "Teclados",
  "Mouses",
  "Webcams",
  <Divider key={4}>Componentes</Divider>,
  "Microprocesadores",
  "Tarjetas gráficas",
  "Memoria RAM",
  "Unidades SSD",
  "Fuentes de alimentación",
  "Motherboards",
  <Divider key={5}>Almacenamiento Externo</Divider>,
  "Pendrives",
  "Tarjetas SD",
  "Discos portátiles",
  <Divider key={6}>Redes</Divider>,
  "Cables de alimentación",
  "Cables de audio",
  "Conectores de red",
  "Switches",
  "Routers",
  "Modems",
  <Divider key={7}>Video</Divider>,
  "Cámaras de seguridad",
  <Divider key={8}>Servicios</Divider>,
  "Limpieza de Hardware",
  "Limpieza de Software",
  "Formateo",
];

export default function ServicesList() {
  return (
    <List>
      {listItems.map((item, i) =>
        typeof item != "string" ? (
          item
        ) : (
          <ListItem key={i}>
            <ListItemButton>{item}</ListItemButton>
          </ListItem>
        )
      )}
    </List>
  );
}
