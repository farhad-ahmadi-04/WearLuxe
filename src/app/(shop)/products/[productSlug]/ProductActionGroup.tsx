"use client"

import { addProduct } from "@/app/cart/cartSlice";
import { IProduct } from "@/types/product";
import { Add, Remove } from "@mui/icons-material";
import { Box, Button, IconButton, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

function ProductActionGroup({ product }: { product: IProduct }) {
    const [quantity, setQuantity] = useState(1)
    const [view, setView] = useState('');
    const dispatch = useDispatch()

    const handleAddProduct = (product: IProduct) => {
        const newProduct = {
            productId: product.id,
            name: product.name,
            quantity: quantity,
            unitPrice: product.discountedPrice,
            totalPrice: product.discountedPrice * quantity,
            image: product.images[0],
            imageTitle: product.name,
            size: view,
        };
        dispatch(addProduct(newProduct))
    }
    const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
        setView(nextView);
    };

    return (
        <Box sx={{ marginTop: 1, display: "flex", flexDirection: "column", gap: 1 }}>
            {/* quantity option */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => setQuantity(quantity + 1)}>
                    <Add />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{quantity}</Typography>
                <IconButton onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
                    <Remove />
                </IconButton>
            </Box>

            {/* size toggle */}
            <Box >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Typography variant="body2">سایز:</Typography>
                    <Typography color={!view ? "textDisabled" : ""}> {view || "لطفا یک سایز را انتخاب کنید"}</Typography>
                </Box>
                <ToggleButtonGroup
                    color="primary"
                    orientation="horizontal"
                    value={view}
                    exclusive
                    fullWidth
                    onChange={handleChange}
                    sx={{ direction: "ltr" }}
                >
                    {Object.entries(product.sizes).map(([key, value], index) => (
                        <ToggleButton disabled={!value.stock} key={index} value={key}>
                            {key}
                        </ToggleButton>

                    ))}
                </ToggleButtonGroup>
            </Box>

            {/* add to cart button */}
            <Button disabled={!view || !product.stock} fullWidth variant="contained" color="primary" onClick={() => handleAddProduct(product)}>
                افزودن به سبد خرید
            </Button>
        </Box>
    );
}

export default ProductActionGroup;