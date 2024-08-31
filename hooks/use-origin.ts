import { useMounted } from "@/hooks/use-mounted"

export const useOrigin = () => {
  const isMounted = useMounted()
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ""

  if (!isMounted) return ""

  return origin
}
