import { getProduct } from "@/services/getProduct";
import { ICategory } from "@/types/category";
import { Email, Instagram, Telegram } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Container from "./container";

async function Footer() {
  const { data } = await getProduct<ICategory[]>(
    "http://localhost:4000/categories"
  );

  return (
    <Box component="footer" sx={{ bgcolor: "primary.main", py: 4 }}>
      <Container className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-primary-50">
        <div>
          <Typography
            variant="h6"
            sx={{
              border: "2px solid AppWorkspace",
              borderRadius: 2,
              width: "fit-content",
              padding: 7,
            }}
          >
            اینماد
          </Typography>
        </div>
        <div>
          <Typography variant="h6" gutterBottom>
            با ما در ارتباط باشید
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              aria-label="Instagram"
              component="a"
              href="https://instagram.com"
            >
              <Instagram color="disabled" />
            </IconButton>
            <IconButton
              aria-label="Email"
              component="a"
              href="mailto:contact@wearluxe.com"
            >
              <Email color="disabled" />
            </IconButton>
            <IconButton
              aria-label="Telegram"
              component="a"
              href="https://telegram.org"
            >
              <Telegram color="disabled" />
            </IconButton>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">
              شماره پشتیبانی: +1 (888) 123-4567
            </Typography>
          </Box>
        </div>
        <div>
          <Typography variant="h6" gutterBottom>
            دسته‌بندی‌ها
          </Typography>
          <List sx={{ textAlign: "start" }}>
            {Array.isArray(data) &&
              data.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <Link href={`/products/category/${item.slug}`}>
                    <ListItemText primary={item.title} />
                  </Link>
                </ListItem>
              ))}
          </List>
        </div>
        <div>
          <Typography variant="h6" gutterBottom>
            درباره WearLuxe
          </Typography>
          <List sx={{ textAlign: "start" }}>
            <ListItem disablePadding>
              <Link href={"/aboutus"}>
                <ListItemText primary="درباره ما" />
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <Link href={"/"}>
                <ListItemText primary="تماس با ما" />
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <Link href={"/"}>
                <ListItemText primary="قوانین و مقررات" />
              </Link>
            </ListItem>
          </List>
        </div>
      </Container>
    </Box>
  );
}

export default Footer;
