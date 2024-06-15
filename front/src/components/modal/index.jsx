import { useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

function CloseModal({ title, onClose }) {
    const [open, setOpen] = useState(true);

    return <Modal
        aria-labelledby="close-modal-title"
        open={open}
        onClose={() => {
            setOpen(false)
            onClose()
        }}
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Sheet
            variant="outlined"
            sx={{
                minWidth: 300,
                borderRadius: 'md',
                p: 3,
            }}
        >
            <ModalClose variant="outlined" />
            <Typography
                component="h2"
                id="close-modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                paddingRight={"30px"}
            >
                {title}
            </Typography>
        </Sheet>
    </Modal>

}

export default CloseModal