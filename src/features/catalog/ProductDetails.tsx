import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Skeleton, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import agent from "../../app/Api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/Product";
import { currencyFormat } from "../../app/util/util";

export default function ProductDetails() {
    const {basket, setBasket, removeItem} = useStoreContext();
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        agent.Catalog.details(id)
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id, item])

    function handleInputChange(event: any) {
        if (event.target.value >= 0 ){
            setQuantity(event.target.value);
        }
    }

    function handleUpdateCart() {
        setSubmitting(true);
        if (!item || quantity > item.quantity) {
            const updateQuantity = item ? quantity - item.quantity : quantity;
            agent.Basket.addItem(product?.id!, updateQuantity)
                .then(basket => setBasket(basket))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false))
        } else {
            const updateQuantity = item.quantity - quantity;
            agent.Basket.removeItem(product?.id!, updateQuantity)
                .then(() => removeItem(product?.id!, updateQuantity))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false))
        }
    }

    if(loading) return <LoadingComponent message="Loading product..."/>
    if (!product) return <NotFound />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                {loading ? (<Skeleton animation="wave" variant="rectangular" width='100%' height='100%' />) : (<img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />)}
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{loading ? (<Skeleton />) : product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h3" color="secondary">{loading ? (<Skeleton />) : currencyFormat(product.price)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>{loading ? (<Skeleton />) : 'Name'}</TableCell>
                                <TableCell>{loading ? (<Skeleton />) : product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{loading ? (<Skeleton />) : 'Description'}</TableCell>
                                <TableCell>{loading ? (<Skeleton />) : product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{loading ? (<Skeleton />) : 'Type'}</TableCell>
                                <TableCell>{loading ? (<Skeleton />) : product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{loading ? (<Skeleton />) : 'Brand'}</TableCell>
                                <TableCell>{loading ? (<Skeleton />) : product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{loading ? (<Skeleton />) : 'Quantity in stock'}</TableCell>
                                <TableCell>{loading ? (<Skeleton />) : product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField 
                            onChange={handleInputChange}
                            variant="outlined"
                            type="number"
                            label="Quantity in Cart"
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || !item && quantity === 0}
                            loading={submitting}
                            onClick={handleUpdateCart}
                            sx={{height: "55px"}}
                            color="primary"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            {item ? "Update Quantity" : "Add to Cart"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}