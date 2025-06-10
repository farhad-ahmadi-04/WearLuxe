import Container from "@/components/container";
import HeroSection from "@/components/layout/hero";
import ProductSlider from "@/components/products/productSlider";
import { getProduct } from "@/services/getProduct";
import { IBanner } from "@/types/banners";
import { IOption } from "@/types/options";
import { IProduct } from "@/types/product";
import { Box, CardMedia, Typography } from "@mui/material";

export default async function HomePage() {
  const { data: dataShirts } = await getProduct<IProduct[]>(
    "http://localhost:4000/products?categoryId=1"
  );
  const { data: dataPants } = await getProduct<IProduct[]>(
    "http://localhost:4000/products?categoryId=2"
  );
  const { data: dataCaps } = await getProduct<IProduct[]>(
    "http://localhost:4000/products?categoryId=3"
  );
  const { data: dataSets } = await getProduct<IProduct[]>(
    "http://localhost:4000/products?categoryId=4"
  );
  const { data: dataOptions } = await getProduct<IOption[]>(
    "http://localhost:4000/options"
  );
  const { data: landingBaner } = await getProduct<IBanner[]>(
    "http://localhost:4000/banners"
  );

  return (
    <>
      <HeroSection />
      <Container
        className="!px:w-full !px-3/4"
        sx={{
          backgroundColor: "var(--color-neutral-200)",
          borderRadius: "18px",
          display: "flex",
          padding: "30px 0",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {Array.isArray(dataOptions) &&
          dataOptions.map((option) => (
            <Box
              key={option.id}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              <CardMedia
                component="img"
                image={option.src}
                alt={option.name}
                sx={{
                  width: "40px",
                  height: "auto",
                  borderRadius: "12px",
                }}
              />
              <Typography
                variant="h6"
                sx={{ color: "var(--color-neutral-600)" }}
              >
                {option.name}
              </Typography>
            </Box>
          ))}
      </Container>
      <ProductSlider sx={{ pt: "20px" }} data={dataShirts} />
      <Container>
        <Box className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 px-8 md:px-16 py-4 md:py-8">
          <CardMedia
            component="img"
            image={"/images/hero03.jpg"}
            alt="test1"
            className="h-full rounded-2xl"
          />
          <CardMedia
            component="img"
            image={"/images/hero04.jpg"}
            alt="test2"
            className="h-full rounded-2xl"
          />
          <CardMedia
            component="img"
            image={"/images/hero05.jpg"}
            alt="test3"
            className="h-full rounded-2xl"
          />
          <CardMedia
            component="img"
            image={"/images/hero06.jpg"}
            alt="test4"
            className="h-full rounded-2xl"
          />
        </Box>
      </Container>
      <ProductSlider sx={{ pt: "20px" }} data={dataCaps} />
      <ProductSlider sx={{ pt: "20px" }} data={dataPants} />
      <Container sx={{ width: "100%", height: "200px", pt: "20px" }}>
        <CardMedia
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            width: "100%",
            height: "100%",
          }}
          component="img"
          image={landingBaner[0].src}
          alt={landingBaner[0].alt}
        />
      </Container>
      <ProductSlider sx={{ pt: "20px" }} data={dataSets} />
    </>
  );
}
