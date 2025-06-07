import ProductDetailsFilter from "@/app/(shop)/products/category/[categorySlug]/productDetailsFilter";
import ProductDetailsSort from "@/app/(shop)/products/category/[categorySlug]/productDetailsSort";
import Container from "@/components/container";
import PaginationWithLinks from "@/components/pagination";
import ProductCard from "@/components/products/productCard";
import { getProduct } from "@/services/getProduct";
import { IProduct } from "@/types/product";
import { Box } from "@mui/material";
import Link from "next/link";
interface ICategoryPageProps {
  searchParams: Promise<{ sort: string }>;
  params: Promise<{ categorySlug: string }>;
}

export default async function CategoryPage({
  searchParams,
  params,
}: ICategoryPageProps) {
  const url = (await searchParams) as Record<string, string>;

  let filters = "";
  for (const i in url) {
    filters += `${i}=${url[i]}&`;
  }

  const dataLength = await getProduct(
    `http://localhost:4000/products?categoryId=${(await params).categorySlug}`
  );
  const totalPages = Math.ceil((dataLength.data as IProduct[]).length / 12);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const { data, error } = await getProduct(
    `http://localhost:4000/products?categoryId=${
      (
        await params
      ).categorySlug
    }&${filters}&_page=1&_limit=12&`
  );

  if (error) {
    return <div>Error loading products</div>;
  }

  if (!data && !error) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", xl: "row" },
        pt: 2,
      }}
    >
      <Box
        sx={{
          display: { xs: "none", xl: "flex" },
        }}
      >
        <ProductDetailsFilter showDrawerFilter={false} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: { xs: "flex", xl: "none" },
            }}
          >
            <ProductDetailsFilter showDrawerFilter={false} />
          </Box>
          <ProductDetailsSort showDrawerSort={false} />
        </Box>
        <Box
          sx={{
            width: "100%",
            px: 0,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {(data as IProduct[]).map((item: IProduct) => (
            <Box
              key={item.id}
              sx={{
                p: 2,
                width: {
                  xs: "50%",
                  sm: "33.3333%",
                  lg: "25%",
                },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link href={`/products/${item.id}`}>
                <ProductCard item={item} />
              </Link>
            </Box>
          ))}
        </Box>
        {pageNumbers.length > 1 && (
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              py: "12px",
            }}
          >
            <PaginationWithLinks
              count={pageNumbers.length}
              categorySlug={(await params).categorySlug.toString()}
              filters={filters}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}
