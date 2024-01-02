import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useEffect, useState} from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {Order} from "../../app/models/order";
import {currencyFormat} from "../../app/util/util";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import OrderDetails from "./OrderDetails";

export default function Orders() {
    const [viewDetails, setViewDetails] = useState(false)
    const [orders, setOrders] = useState<Order[] | null>(null)
    const [orderSelected, setOrderSelected] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (viewDetails) return
        agent.Order.list()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [viewDetails]);

    if (loading) return <LoadingComponent message={'Loading orders...'}/>

    const tableOrders = (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order number</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Order Date</TableCell>
                        <TableCell align="right">Order Status</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order: Order) => (
                        <TableRow
                            key={order.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">{order.id}</TableCell>
                            <TableCell align="right">{currencyFormat(order.total)}</TableCell>
                            <TableCell align="right">{order.orderDate.split('T')[0]}</TableCell>
                            <TableCell align="right">{order.orderStatus}</TableCell>
                            <TableCell align="right">
                                <IconButton
                                    onClick={() => {
                                        setOrderSelected(order)
                                        setViewDetails(!viewDetails)
                                    }}
                                ><RemoveRedEyeOutlinedIcon/></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    return viewDetails && orderSelected ?
        <OrderDetails order={orderSelected} setViewDetails={setViewDetails}/> : tableOrders
}