import Stripe from "stripe"
import { stripeConfig } from "@/configs/stripe.config"

export const stripe = new Stripe(stripeConfig(), {
  apiVersion: "2024-06-20",
  typescript: true,
})
