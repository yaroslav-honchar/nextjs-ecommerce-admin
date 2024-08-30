export const baseApiUrlConfig = () => {
  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!baseApiUrl) {
    throw new Error("API base URL is missing")
  }

  return baseApiUrl
}
