import { IProduct } from "@/types/product";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const categoryId = searchParams.get("categoryId");
    const color = searchParams.get("color");
    const size = searchParams.get("size");
    const sortParam = searchParams.get("sort");
    const minPrice = searchParams.get("price_gte");
    const maxPrice = searchParams.get("price_lte");

    const filePath = path.join(process.cwd(), "src", "data", "db.json");
    const file = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(file);

    let filtered = json.products;

    if (categoryId) {
      filtered = filtered.filter(
        (item: IProduct) => item.categoryId === categoryId
      );
    }

    if (color) {
      filtered = filtered.filter(
        (item: IProduct) => item.color?.toLowerCase() === color.toLowerCase()
      );
    }

    if (size) {
      filtered = filtered.filter((item: IProduct) => {
        const sizes = item.sizes || {};
        const targetSize = sizes[size];
        return targetSize?.stock === true;
      });
    }

    if (minPrice || maxPrice) {
      filtered = filtered.filter((item: IProduct) => {
        const price = Number(item.price);
        const min = minPrice ? Number(minPrice) : 0;
        const max = maxPrice ? Number(maxPrice) : Infinity;
        return price >= min && price <= max;
      });
    }

    if (sortParam && filtered.length > 0) {
      switch (sortParam) {
        case "sales-desc":
          filtered.sort(
            (a: IProduct, b: IProduct) => Number(b.sales) - Number(a.sales)
          );
          break;
        case "rating-desc":
          filtered.sort(
            (a: IProduct, b: IProduct) => Number(b.rating) - Number(a.rating)
          );
          break;
        case "publishTimeSort-desc":
          filtered.sort(
            (a: IProduct, b: IProduct) =>
              new Date(b.publishTimeSort).getTime() -
              new Date(a.publishTimeSort).getTime()
          );
          break;
        case "price-asc":
          filtered.sort(
            (a: IProduct, b: IProduct) => Number(a.price) - Number(b.price)
          );
          break;
        case "price-desc":
          filtered.sort(
            (a: IProduct, b: IProduct) => Number(b.price) - Number(a.price)
          );
          break;
      }
    }

    return NextResponse.json(filtered);
  } catch (error) {
    console.error("خطا:", error);
    return NextResponse.json(
      { error: "خطا در دریافت محصولات" },
      { status: 500 }
    );
  }
}
