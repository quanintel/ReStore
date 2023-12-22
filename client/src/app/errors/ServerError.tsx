import {Button, Container, Divider, Paper, Typography} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

export default function ServerError() {
    const navigate = useNavigate();
    const {state} = useLocation();

    return (
        <Container component={Paper}>
            {state?.error
                ? (
                    <>
                        <Typography variant={'h3'} gutterBottom color={'error'}>{state.error.title}</Typography>
                        <Divider/>
                        <Typography variant={'body1'}>{state.error.detail || 'Internal server error'}</Typography>
                    </>)
                : (
                    <Typography variant={'h5'} gutterBottom>Server error</Typography>
                )
            }
            <Button onClick={() => navigate('/catalog')}>Go back to store</Button>
        </Container>
    )
}