import ButtonUi from '@mui/joy/Button';

function Button({ handler, content, height = "100%", width }) {
    return <ButtonUi
        variant="solid"
        onClick={handler}
        color="primary"
        aria-label="Explore Bahamas Islands"
        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600, height: { height }, width: { width } }}
    >
        {content}
    </ButtonUi>
}

export default Button