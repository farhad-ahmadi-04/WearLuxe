import { IProduct } from "@/types/product";

/**
 * Fetches product data from the provided URL.
 *
 * This function makes an asynchronous HTTP request to retrieve product information.
 * It includes caching options using the revalidate configuration to optimize repeated requests.
 * If the fetch operation fails or the product data is not found, the function returns an error message.
 *
 * @param url - The URL endpoint from which to fetch the product data.
 * @returns A Promise resolving to an object containing:
 *          - data: The product information of type IProduct. In case of an error, this will be an empty object.
 *          - error: An error message string if an error occurs; otherwise, an empty string.
 */
export const getProduct = async (
  url: string
): Promise<{ data: IProduct; error: string }> => {
  try {
    // Enable caching with revalidation
    const res = await fetch(url, { next: { revalidate: 10000 } });
    if (!res.ok)
      throw new Error("خطا در برقراری ارتباط, لطفا دوباره امتحان کنید.");
    const data = await res.json();
    if (!data) throw new Error("محصولی یافت نشد.");
    return { data, error: "" };
  } catch (error: any) {
    return { data: {} as IProduct, error: error.message };
  }
};
