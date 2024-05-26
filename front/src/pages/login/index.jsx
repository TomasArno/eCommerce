import React, { useContext, useState } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GoogleIcon from './googleIcon';
import FormHelperText from '@mui/joy/FormHelperText';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

import { GlobalContext } from '../../main';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ColorSchemeToggle(props) {
    const { onClick, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    return (
        <IconButton
            aria-label="toggle light/dark mode"
            size="sm"
            variant="outlined"
            disabled={!mounted}
            onClick={(event) => {
                setMode(mode === 'light' ? 'dark' : 'light');
                onClick?.(event);
            }}
            {...other}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}

function SignIn() {
    const navigate = useNavigate();
    const { handleLogin } = useContext(GlobalContext)
    const [triesEnterPassword, setTriesEnterPassword] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();

        const formElements = e.currentTarget.elements;
        const data = {
            email: formElements.email.value,
            password: formElements.password.value
        };

        axios
            .post('http://localhost:8080/api/sessions/login', data)
            .then((res) => {
                if (res.data.statusCode == 200) {
                    handleLogin()
                    navigate("/")
                }
                else {
                    setTriesEnterPassword(triesEnterPassword + 1)
                    alert(res.data)
                }
            })
            .catch((err) => console.log(err));
    }


    return (<CssVarsProvider defaultMode="dark" disableTransitionOnChange>
        <CssBaseline />
        <GlobalStyles
            styles={{
                ':root': {
                    '--Form-maxWidth': '800px',
                    '--Transition-duration': '0.4s', // set to `none` to disable transition
                },
            }}
        />
        <Box
            sx={(theme) => ({
                width: { xs: '100%', md: '50vw' },
                transition: 'width var(--Transition-duration)',
                transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                backdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(255 255 255 / 0.2)',
                [theme.getColorSchemeSelector('dark')]: {
                    backgroundColor: 'rgba(19 19 24 / 0.4)',
                },
            })}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100dvh',
                    width: '100%',
                    px: 2,
                }}
            >
                <Box
                    component="header"
                    sx={{
                        py: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                        <IconButton variant="soft" color="primary" size="sm">
                            <BadgeRoundedIcon />
                        </IconButton>
                    </Box>
                    <ColorSchemeToggle />
                </Box>
                <Box
                    component="main"
                    sx={{
                        my: 'auto',
                        py: 2,
                        pb: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: 400,
                        maxWidth: '100%',
                        mx: 'auto',
                        borderRadius: 'sm',
                        '& form': {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        },
                        [`& .MuiFormLabel-asterisk`]: {
                            visibility: 'hidden',
                        },
                    }}
                >
                    <Stack gap={4} sx={{ mb: 2 }}>
                        <Stack gap={1}>
                            <Typography component="h1" level="h3">
                                Iniciar sesión
                            </Typography>
                            <Typography level="body-sm">
                                No tienes cuenta?{' '}
                                <Link href="#replace-with-a-link" level="title-sm">
                                    Sign up!
                                </Link>
                            </Typography>
                        </Stack>
                        <Button
                            variant="soft"
                            color="neutral"
                            fullWidth
                            startDecorator={<GoogleIcon />}
                        >
                            Continue with Google
                        </Button>
                    </Stack>
                    <Divider
                        sx={(theme) => ({
                            [theme.getColorSchemeSelector('light')]: {
                                color: { xs: '#FFF', md: 'text.tertiary' },
                            },
                        })}
                    >
                        ó
                    </Divider>
                    <Stack gap={4} sx={{ mt: 2 }}>
                        <form onSubmit={(event) => handleSubmit(event)}>
                            <FormControl error={triesEnterPassword > 0} required>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" name="email" />
                                {
                                    triesEnterPassword > 0 ?
                                        (<FormHelperText>
                                            <InfoOutlined />
                                            Opps! something is wrong.
                                        </FormHelperText>) : ""
                                }
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Contraseña</FormLabel>
                                <Input type="password" name="password" />
                            </FormControl>
                            <Stack gap={4} sx={{ mt: 2 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Link level="title-sm" href="#replace-with-a-link">
                                        Olvidaste tu contraseña?
                                    </Link>
                                </Box>
                                <Button type="submit" fullWidth>
                                    Iniciar Sesión
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
                <Box component="footer" sx={{ py: 3 }}>
                    <Typography level="body-xs" textAlign="center">
                        © Proteo Software
                    </Typography>
                </Box>
            </Box>
        </Box>
        <Box
            sx={(theme) => ({
                height: '100%',
                position: 'fixed',
                right: 0,
                top: 0,
                bottom: 0,
                left: { xs: 0, md: '50vw' },
                transition:
                    'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                backgroundColor: 'background.level1',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundImage:
                    'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
                [theme.getColorSchemeSelector('dark')]: {
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
                },
            })}
        />
    </CssVarsProvider>
    );
}

export default SignIn

