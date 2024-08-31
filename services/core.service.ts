import axios from "axios"
import { baseApiUrlConfig } from "@/configs/base-api-url.config"

const coreService = axios.create({
  baseURL: baseApiUrlConfig(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

export { coreService }
