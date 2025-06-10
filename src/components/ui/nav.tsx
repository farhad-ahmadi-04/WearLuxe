import { getProduct } from "@/services/getProduct";
import { ICategory } from "@/types/category";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

interface INav {
  className?: string;
  type?: "vertical" | "horizontal";
}

/**
 * Renders the navigation component.
 *
 * This component creates a navigation list composed of a home link,
 * dynamically rendered category links, and an "About Us" link.
 *
 * @param props - The props for the Nav component.
 * @param props.className - A string containing additional CSS classes for custom styling.
 * @param props.type - Defines the layout orientation; if set to "vertical", the navigation will be displayed in a column, otherwise it will use a row layout.
 *
 * @example
 * // Render a vertical navigation list with custom styling
 * <Nav className="custom-nav" type="vertical" />
 *
 * @example
 * // Render a horizontal navigation list
 * <Nav className="custom-nav" type="horizontal" />
 */
function Nav({ className, type }: INav) {
  const [category, setCategory] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getProduct<ICategory[]>(
        "http://localhost:4000/categories"
      );
      setCategory(data);
    };
    fetchCategories();
  }, []);

  return (
    <List
      className={`flex ${type === "vertical" && "flex-col"} items-center ${
        type === "vertical" ? "" : "w-fit"
      } text-nowrap ${className}`}
    >
      <ListItem disablePadding>
        <Link className={type === "vertical" ? "w-full" : ""} href={`/`}>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={"خانه"} />
          </ListItemButton>
        </Link>
      </ListItem>
      {Array.isArray(category) &&
        category.map((item) => (
          <ListItem key={item.id} disablePadding>
            <Link
              className={type === "vertical" ? "w-full" : ""}
              href={`/products/category/${item.id}`}
            >
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      <ListItem disablePadding>
        <Link className={type === "vertical" ? "w-full" : ""} href={`/aboutus`}>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={"درباره ما"} />
          </ListItemButton>
        </Link>
      </ListItem>
    </List>
  );
}

export default Nav;
