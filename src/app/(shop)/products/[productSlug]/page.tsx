import Container from "@/components/container";
import SizeToggleButton from "@/components/ui/button/sizeToggleButton";
import { getProduct } from "@/services/getProduct";
import { Box, Button, Divider, Grid, List, ListItem, Typography } from "@mui/material";
import Image from "next/image";
import ProductError from "./error";
import { ArrowLeft, ForkLeftOutlined } from "@mui/icons-material";
import ProductDetails from "./ProductDetails";
import QuantityButton from "@/components/ui/button/QuantityButton";

interface ICategory {
    params: Promise<{ productSlug: string }>;
}

// export async function generateStaticParams() {
//     return categories.map((category) => ({
//         productSlug: category.id,
//     }));
// }

async function ProductId({ params }: ICategory) {
    const url = await params;
    const { data, error } = await getProduct(`http://localhost:4000/products/${url.productSlug}`)

    if (error) return <ProductError error={error} />
    if (!data) return <ProductError error={error} />

    console.log(data);

    return (
        <Container>
            <Grid container spacing={3} sx={{ paddingY: { xs: 10, md: 10 } }}
            >
                <Grid size={{ xs: 12, md: 5 }}>
                    <Image
                        src={data?.images[0] ?? ""}
                        alt={data?.name ?? ""}
                        width={500}
                        height={500}
                        className="w-full"
                    />
                </Grid>
                <Grid
                    size={{ xs: 12, md: 7 }}
                    sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                >
                    <Box>
                        <Box sx={{ display: "flex", flexDirection: { md: "column" }, justifyContent: "space-between" }}>
                            <Typography variant="h5">{data?.name}</Typography>
                            <Box sx={{ display: "flex", gap: 1, alignItems: { xs: "start", md: "center" }, marginTop: { xs: 0, md: 1 } }}>
                                {data.discountedPercentage !== 0 && (
                                    <Typography
                                        sx={{ display: { xs: "none", md: "block" } }}
                                        color="primary"
                                        variant="h6">
                                        {data.discountedPercentage}%
                                    </Typography>
                                )}
                                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", gap: { xs: 1, md: 0 } }}>
                                    <Typography sx={{ backgroundColor: "var(--color-primary-200)", width: "fit-content", paddingX: 2, paddingY: .5, borderRadius: 1, textDecorationLine: data.discountedPercentage ? "line-through" : "none" }}>
                                        {data?.price.toLocaleString()} تومان
                                    </Typography>
                                    {data.discountedPercentage !== 0 &&
                                        <>
                                            <ArrowLeft sx={{ display: { xs: "none", md: "block" } }} />
                                            <Typography sx={{ width: "fit-content", paddingX: 2, paddingY: .5, borderRadius: 1, backgroundColor: "var(--color-primary-400)" }}>
                                                {data?.discountedPrice.toLocaleString()} تومان
                                            </Typography>
                                        </>
                                    }
                                </Box>
                            </Box>
                        </Box>

                        <List sx={{ display: "flex", flexDirection: { xs: "row", md: "column" }, paddingY: 2 }}>
                            <ListItem sx={{ paddingX: { xs: 1, md: 0 }, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "center", md: "flex-start" }, width: { xs: "40%", md: "100%" }, borderLeft: { xs: "1.5px solid rgba(0, 0, 0, 0.12)", md: 0 } }} >
                                <Typography variant="body2">سایز</Typography>
                                <Typography color="textDisabled" sx={{ display: { xs: "none", md: "block" }, marginLeft: 1 }}>:</Typography>
                                <Typography>{data?.sizes.join(", ")}</Typography>
                            </ListItem>

                            <ListItem sx={{ paddingLeft: 0, paddingRight: 0, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "center", md: "flex-start" }, width: "100%" }}>
                                <Typography variant="body2">رنگ</Typography>
                                <Typography color="textDisabled" sx={{ display: { xs: "none", md: "block" }, marginLeft: 1 }}>:</Typography>
                                <Typography>{data?.colors.join(", ")}</Typography>
                            </ListItem>

                            <ListItem sx={{ paddingX: { xs: 1, md: 0 }, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "center", md: "flex-start" }, width: { xs: "40%", md: "100%" }, borderRight: { xs: "1.5px solid rgba(0, 0, 0, 0.12)", md: 0 } }} >
                                <Typography variant="body2">موجودی</Typography>
                                <Typography color="textDisabled" sx={{ display: { xs: "none", md: "block" }, marginLeft: 1 }}>:</Typography>
                                <Typography>{data?.stock ? "موجود" : "ناموجود"}</Typography>
                            </ListItem>

                            <ListItem sx={{ paddingLeft: 0, paddingRight: 0, display: { xs: "none", md: "flex" }, flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "center", md: "flex-start" } }}>
                                <Typography variant="body2">توضیحات</Typography>
                                <Typography color="textDisabled" sx={{ marginLeft: 1 }}>:</Typography>
                                <Typography>{data?.description}</Typography>
                            </ListItem>
                        </List>
                    </Box>

                    <Divider />
                    <Box sx={{ marginTop: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                        <QuantityButton />
                        <SizeToggleButton sizes={data.sizes} />

                        <Button fullWidth variant="contained" color="primary">
                            افزودن به سبد خرید
                        </Button>
                    </Box>
                </Grid>

                <Grid size={12}>
                    <ProductDetails product={data} />
                </Grid>
            </Grid >
        </Container >
    );
}

export default ProductId;