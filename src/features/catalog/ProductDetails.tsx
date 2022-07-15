import { Divider, Grid, Skeleton, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import agent from "../../app/Api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/Product";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Catalog.details(id)
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id])

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
                <Typography variant="h3" color="secondary">{loading ? (<Skeleton />) : '$' + (product.price / 100).toFixed(2)}</Typography>
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
            </Grid>
        </Grid>
    )
}