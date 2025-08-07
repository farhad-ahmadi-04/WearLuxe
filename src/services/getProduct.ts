/**
 * Fetches data from the given API endpoint.
 *
 * Automatically selects base URL from environment variables based on the environment.
 * Gracefully handles errors and invalid responses.
 *
 * @template T - Expected shape of the API response
 * @param endpoint - Relative API endpoint (e.g. `/products?id=1`)
 * @returns A Promise resolving to an object:
 *          - data: Parsed API response of type T
 *          - error: String describing error (empty if success)
 */
export const getProduct = async <T>(
  endpoint: string
): Promise<{ data: T; error: string }> => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 0 }, // disable ISR (optional)
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("ارتباط با سرور با خطا مواجه شد.");
    }

    const jsonData: unknown = await response.json();

    if (
      !jsonData ||
      (typeof jsonData !== "object" && !Array.isArray(jsonData))
    ) {
      throw new Error("پاسخ نامعتبر از سرور دریافت شد.");
    }

    return { data: jsonData as T, error: "" };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "خطایی ناشناخته رخ داده است.";

    // fallback: return empty array or object depending on generic T
    const fallback: T = Array.isArray([] as T) ? ([] as T) : ({} as T);

    return {
      data: fallback,
      error: errorMessage,
    };
  }
};
