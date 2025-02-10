import { Menu, MenuButton, MenuItem, Dropdown } from "@mui/joy";

export default function DropDownMenu() {
  return (
    <>
      <Dropdown>
        <MenuButton>Computadoras</MenuButton>
        <Menu>
          <MenuItem>Escritorio</MenuItem>
          <MenuItem>Notebooks</MenuItem>
        </Menu>
      </Dropdown>
      <Dropdown>
        <MenuButton>Placas de video</MenuButton>
      </Dropdown>
      <Dropdown>
        <MenuButton>Microprocesadores</MenuButton>
      </Dropdown>
      <Dropdown>
        <MenuButton>Memorias</MenuButton>
      </Dropdown>
      <Dropdown>
        <MenuButton>Gabinetes</MenuButton>
      </Dropdown>
      <Dropdown>
        <MenuButton>Arma tu PC</MenuButton>
      </Dropdown>
    </>
  );
}
