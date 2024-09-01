/**
 * A function to format a price value into a currency string using the Intl.NumberFormat API.
 * If the input price is not a number, it appends a dollar sign to the end of the price.
 *
 * @param price - The price value to be formatted. It can be a number or a string that can be converted to a number.
 * @param options - Optional. An object containing options for the Intl.NumberFormat API.
 *
 * @returns A formatted currency string.
 *
 * @example
 * ```typescript
 * const formattedPrice = priceFormatter(12345.67);
 * console.log(formattedPrice); // Output: $12,345.67
 *
 * const formattedPriceWithOptions = priceFormatter(12345.67, { minimumFractionDigits: 0 });
 * console.log(formattedPriceWithOptions); // Output: $12,346
 *
 * const formattedPriceWithNonNumericInput = priceFormatter("abc");
 * console.log(formattedPriceWithNonNumericInput); // Output: abc $
 * ```
 */
export const priceFormatter = (price: number | string, options?: Intl.NumberFormatOptions): string => {
  const priceAsNumber = +price

  if (isNaN(priceAsNumber)) {
    return price + " $"
  }

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    ...(options ? options : {}),
  }).format(priceAsNumber)
}
