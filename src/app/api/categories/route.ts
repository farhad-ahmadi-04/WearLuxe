import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "db.json");
    const file = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(file);

    const categories = json.categories;

    if (!categories || !Array.isArray(categories)) {
      return NextResponse.json(
        { error: "دسته‌بندی‌ای یافت نشد." },
        { status: 404 }
      );
    }

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در دریافت دسته‌بندی‌ها" },
      { status: 500 }
    );
  }
}
