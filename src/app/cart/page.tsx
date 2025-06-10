"use client";

import CartQuantityButton from "@/components/ui/button/cartQuantityButton";
import { formatPrice } from "@/helper/helper";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeProduct } from "./cartSlice";

function CartPage() {
  const cart = useSelector(getCart);
  const [clientRendered, setClientRendered] = useState(false);
  const dispatch = useDispatch();
  const cartLength = clientRendered ? cart.length : 0;

  useEffect(() => {
    setClientRendered(true);
  }, []);

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        محصولات سبد خرید ({cartLength})
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {cartLength === 0 ? (
        <Typography>سبد خرید شما خالی است</Typography>
      ) : (
        <Stack spacing={2}>
          {Array.isArray(cart) &&
            cart.map((item, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  p: 2,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", sm: 200 },
                    height: { xs: "100%", sm: 200 },
                    objectFit: "contain",
                  }}
                  image={item.image}
                  alt={item.imageTitle}
                />

                <CardContent
                  sx={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Link href={`/products/${item.productId}`}>
                      <Typography variant="h6">{item.name}</Typography>
                    </Link>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="p"
                    >
                      سایز: {item.size}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="p"
                    >
                      {formatPrice(item.unitPrice)}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                      {formatPrice(item.totalPrice)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <CartQuantityButton item={item} />
                    <IconButton
                      color="error"
                      onClick={() => dispatch(removeProduct(item))}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Stack>
      )}
    </Paper>
  );
}

export default CartPage;
