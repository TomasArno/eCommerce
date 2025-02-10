import { List, ListItem, ListItemButton, Divider } from "@mui/joy";

const listItems = [
  <Divider key={1000}>Combos</Divider>,
  "Disponibles",
  "Arma tu combo",
  <Divider key={2000}>Computadoras</Divider>,
  "Servidores",
  "Escritorio",
  "Laptops",
  <Divider key={3000}>Periféricos</Divider>,
  "Monitores",
  "Parlantes",
  "Teclados",
  "Mouses",
  "Webcams",
  <Divider key={4000}>Componentes</Divider>,
  "Microprocesadores",
  "Tarjetas gráficas",
  "Memoria RAM",
  "Unidades SSD",
  "Fuentes de alimentación",
  "Motherboards",
  <Divider key={5000}>Almacenamiento Externo</Divider>,
  "Pendrives",
  "Tarjetas SD",
  "Discos portátiles",
  <Divider key={6000}>Redes</Divider>,
  "Cables de alimentación",
  "Cables de audio",
  "Conectores de red",
  "Switches",
  "Routers",
  "Modems",
  <Divider key={7000}>Video</Divider>,
  "Cámaras de seguridad",
  <Divider key={8000}>Servicios</Divider>,
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
