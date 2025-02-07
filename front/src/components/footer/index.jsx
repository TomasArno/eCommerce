import { Box, Typography, Link, Stack, Grid } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LogoFooter from "/images/Logo.png";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/technologies_core/",
    icon: <InstagramIcon />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/core-tech-7/",
    icon: <LinkedInIcon />,
  },
  { name: "Mail", url: "mailto:info@core-tech.io", icon: <EmailIcon /> },
  { name: "WhatsApp", url: "https://wa.link/kugic0", icon: <WhatsAppIcon /> },
];

const navLinks = [
  { name: "Soluciones", href: "#solutions" },
  { name: "Nosotros", href: "#aboutUs" },
  { name: "Contacto", href: "#contact" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        color: "white",
        width: "100%",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box
            component="img"
            src={LogoFooter}
            alt="Logo"
            sx={{
              height: 180,
              position: "relative",
            }}
          />
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={3}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  sx={{
                    color: "inherit",
                    textDecoration: "none",
                    fontSize: "16px",
                    fontFamily: "Mona Sans, serif",
                    pb: 5,
                    transition: "color 0.3s",
                    "&:hover": {
                      color: "rgb(191, 189, 189)",
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
            <Stack direction="row" spacing={5} sx={{}}>
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: "inherit",
                    fontFamily: "Mona Sans, serif",
                    transition: "color 0.3s",
                    "&:hover": {
                      color: "rgb(191, 189, 189)",
                    },
                  }}
                >
                  {link.icon}
                </Link>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <Typography
        variant="body2"
        align="center"
        sx={{
          pb: 2,
          pt: 2,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
        }}
      >
        Copyright © Core Technologies {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}
