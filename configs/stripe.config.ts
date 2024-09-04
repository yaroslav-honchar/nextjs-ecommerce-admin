type envVarKeyType = "STRIPE_API_KEY" | "STRIPE_WEBHOOK_KEY"

export const stripeConfig = (nvVarKey: envVarKeyType = "STRIPE_API_KEY") => {
  const stripeApikey = process.env[nvVarKey]
  if (!stripeApikey) {
    throw new Error("Stripe api key is missing")
  }

  return stripeApikey
}
