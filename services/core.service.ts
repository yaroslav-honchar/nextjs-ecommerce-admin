import axios from "axios"
import { baseApiUrlConfig } from "@/configs/base-api-url.config"

const coreService = axios.create({
  baseURL: baseApiUrlConfig(),
  headers: {
    "Content-Type": "application/json",
  },
})

export { coreService }
