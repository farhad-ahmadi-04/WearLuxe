import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "db.json");
    const file = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(file);

    return NextResponse.json(json.banners);
  } catch (error) {
    return NextResponse.json({ error: "خطا در دریافت بنر" }, { status: 500 });
  }
}
