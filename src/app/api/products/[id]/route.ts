import { IProduct } from "@/types/product";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // گرفتن id از URL

    const filePath = path.join(process.cwd(), "src", "data", "db.json");
    const file = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(file);

    const product = json.products.find((p: IProduct) => p.id === id);

    if (!product) {
      return NextResponse.json({ error: "محصول پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات محصول" },
      { status: 500 }
    );
  }
}
