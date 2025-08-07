import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "db.json");
    const file = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(file);

    const options = json.options;

    if (!options || !Array.isArray(options)) {
      return NextResponse.json(
        { error: "هیچ گزینه‌ای پیدا نشد." },
        { status: 404 }
      );
    }

    return NextResponse.json(options);
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در دریافت گزینه‌ها" },
      { status: 500 }
    );
  }
}
