// export interface IProduct {
//   id: string;
//   categoryId: string;
//   categoryName: string;
//   slug: string;
//   name: string;
//   price: number;
//   discountedPercentage: number;
//   discountedPrice: number;
//   stock: boolean;
//   images: string[];
//   rating: number;
//   description: string;
//   color: string;
//   colors: string[];
//   material: string;
//   publishTime: string;
//   publishTimeSort: string;
//   sales: number;
//   size: string;
//   sizes: {
//     [key: string]: {
//       dimensions: {
//         height: number;
//         width: number;
//       };
//       stock: boolean;
//     };
//   };
//   type: string;
// }

export interface IProduct {
  id: string;
  categoryId: string;
  categoryName: string;
  color: string;
  colors: string[];
  description: string;
  discountedPercentage: number;
  discountedPrice: number;
  images: string[];
  material: string;
  name: string;
  price: number;
  publishTime: string;
  publishTimeSort: string;
  rating: number;
  sales: number;
  size: string;
  sizes: Record<
    string,
    { dimensions: { height: number; width: number }; stock: boolean }
  >;
  slug: string;
  stock: boolean;
  type: string;
}
