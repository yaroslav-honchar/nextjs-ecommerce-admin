import slug from "slug"

export const generateSlug = (label: string, id: string) => {
  return `${slug(label)}-${id}`
}
