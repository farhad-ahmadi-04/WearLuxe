"use client";

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../container";
import { Box, Grid, Typography } from "@mui/material";

function HeroSection() {
  return (
    <Container>
      <Grid container spacing={2} size={12}
        sx={{
          paddingY: 5
        }}>
        <Grid sx={{ height: { xs: 350, md: 500 } }} size={{ xs: 12, md: 8 }}>
          <Swiper
            centeredSlides={true}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              enabled: true
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
            style={{ height: "100%", borderRadius: 3 }}
          >
            <SwiperSlide style={{ height: '100%' }}>
              <Box width={"100%"} height={"100%"} sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "flex-end" },
                background: { xs: "none", sm: 'url("/images/banner-15.jpg")' },
                backgroundSize: { xs: "none", sm: 'cover' },
                backgroundPosition: { xs: "none", sm: 'center' },
                backgroundRepeat: { xs: "none", sm: 'no-repeat' }
              }}>
                <Box sx={{ padding: 4, textAlign: "center" }}>
                  <Typography fontSize={{ xs: 20, md: 24 }}>خوش پوشی شایسته شماست</Typography>
                  <Typography variant="h6" fontSize={{ xs: 24, md: 32 }}>WEARLUXE</Typography>
                </Box>
              </Box>
            </SwiperSlide>
            <SwiperSlide style={{ height: '100%' }}>
              <Box width={"100%"} height={"100%"} sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "flex-end" },
                background: { xs: "none", sm: 'url("/images/banner-25.jpg")' },
                backgroundSize: { xs: "none", sm: 'cover' },
                backgroundPosition: { xs: "none", sm: 'center' },
                backgroundRepeat: { xs: "none", sm: 'no-repeat' }
              }}>
                <Box sx={{ padding: 4, textAlign: "center" }}>
                  <Typography fontSize={{ xs: 20, md: 24 }}>خوش پوشی شایسته شماست</Typography>
                  <Typography variant="h6" fontSize={{ xs: 24, md: 32 }}>WEARLUXE</Typography>
                </Box>
              </Box>
            </SwiperSlide>
          </Swiper>
        </Grid>

        <Grid gap={2} size={{ xs: 12, md: 4 }}
          sx={{
            height: { xs: 350, md: 500 },
            display: "flex",
            flexDirection: { xs: "column", sm: "row", md: "column" },
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Box width={"100%"} height={"100%"} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            background: 'url("/images/banner-15.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
            <Box sx={{ padding: 4, textAlign: "center" }}>
              <Typography fontSize={{ xs: 16, md: 18 }}>تخفیف های شگفت انگیز</Typography>
              <Typography variant="h6" fontSize={{ xs: 20, md: 26 }}>WEARLUXE</Typography>
            </Box>
          </Box>
          <Box width={"100%"} height={"100%"} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            background: 'url("/images/banner-25.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
            <Box sx={{ padding: 4, textAlign: "center" }}>
              <Typography fontSize={{ xs: 16, md: 18 }}>قیمت هایی مناسب</Typography>
              <Typography variant="h6" fontSize={{ xs: 20, md: 26 }}>WEARLUXE</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HeroSection;
