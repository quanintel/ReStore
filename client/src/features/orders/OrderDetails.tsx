import {Box, Button, Grid, Typography} from "@mui/material";
import BasketTable from "../basket/BasketTable";
import {Order} from "../../app/models/order";
import BasketSummary from "../basket/BasketSummary";
import {BasketItem} from "../../app/models/basket";

interface Props {
    order: Order
    setViewDetails: (isView: boolean) => void
}

export default function OrderDetails({order, setViewDetails}: Props) {
    const subtotal = order?.orderItems?.reduce((pre: number, cur: any) => pre + (cur?.price * cur?.quantity), 0) ?? 0
    return (
        <>
            <Box display={'flex'} justifyContent={'space-between'} padding={3}>
                <Typography variant={'h3'}>Order#{order.id} - {order.orderStatus}</Typography>
                <Button variant={'contained'} onClick={() => setViewDetails(false)}>Back to orders</Button>
            </Box>
            <BasketTable items={order.orderItems as BasketItem[]} isBasket={false}/>
            <Grid container>
                <Grid item xs={6}/>
                <Grid item xs={6}>
                    <BasketSummary subtotal={subtotal}/>
                </Grid>
            </Grid>
        </>
    )
}