import { Product } from "../../app/models/Product"
import { Button } from "@mui/material";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('https://localhost:5001/api/products')
            .then(resp => resp.json())
            .then(data => setProducts(data))
    }, []);

    return (
        <>
            <ProductList products={products} />
            <Button variant='contained' onClick={() => 0}>Add product</Button>
        </>
    )
}