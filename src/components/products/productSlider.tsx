"use client";

import { IProduct } from "@/types/product";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../container";
import ProductCard from "./productCard";

interface ProductSliderProps {
  data: IProduct[];
  className?: string;
  sx?: object;
}

export default function ProductSlider({
  data,
  className,
  sx,
}: ProductSliderProps) {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          ...sx,
        }}
      >
        <Typography
          variant="h6"
          className="text-neutral-800 pt-4 pb-2"
          sx={{
            color: "var(--color-neutral-800)",
            paddingTop: "16px",
            paddingBottom: "8px",
          }}
        >
          {data[0].categoryName}
        </Typography>

        <Link href={`/products/category/${data[0].categoryId}`}>
          <Button
            variant="outlined"
            // className="!border-neutral-800 !text-neutral-800"
            sx={{
              border: "1px solid var(--color-neutral-300)",
              color: "var(--color-neutral-800)",
              padding: "6px 28px",
              ":hover": {
                border: "1px solid var(--color-neutral-600)",
                background: "var(--color-neutral-200)",
              },
              transition: "all 0.3s ease",
            }}
          >
            مشاهده همه
          </Button>
        </Link>
      </Box>
      <Swiper
        spaceBetween={10}
        freeMode={true}
        modules={[Pagination]}
        className={`!px-2 !py-4 !pt-0 ${className}`}
        breakpoints={{
          360: {
            slidesPerView: 2,
          },
          460: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          800: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {Array.isArray(data) && data.map((item: IProduct) => (
          <SwiperSlide key={item.id}>
            <Link href={`products/${item.id}`}>
              <ProductCard item={item} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
