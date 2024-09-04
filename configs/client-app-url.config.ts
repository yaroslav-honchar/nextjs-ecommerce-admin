export const clientAppUrlConfig = () => {
  const clientAppUrl = process.env.CLIENT_APP_URL
  if (!clientAppUrl) {
    throw new Error("Client app URL is missing")
  }

  return clientAppUrl
}
