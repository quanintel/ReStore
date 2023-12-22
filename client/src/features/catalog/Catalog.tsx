import {Product} from "../../app/models/product";
import {Button} from "@mui/material";
import ProductList from "./ProductList";
import {useEffect, useState} from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        agent.Catalog.list()
            .then(products => setProducts(products))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingComponent message={'Loading products...'}/>

    function addProduct() {
        setProducts(prevState =>
            [...prevState,
                {
                    id: prevState.length + 111,
                    name: 'product' + (prevState.length + 1),
                    price: (prevState.length * 1000 + 1000),
                    brand: 'some brand',
                    description: 'some description',
                    pictureUrl: 'http://picsum.photos/200'
                }
            ]
        )
    }

    return (
        <>
            <ProductList products={products}/>
            <Button variant="contained" onClick={addProduct}>Add Product</Button>
        </>
    )
}