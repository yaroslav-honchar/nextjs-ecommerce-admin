const dynamicConstants = {
  create: {
    title: "Create subcategory",
    description: "Creating store subcategory",
    submitSuccess: "Subcategory created",
    submitFailed: "Subcategory editing saved",
    action: "Create",
  },
  update: {
    title: "Edit subcategory",
    description: "Managing store of subcategory",
    submitSuccess: "Subcategory editing saved",
    action: "Edit",
  },
}

export const getFormConstants = (hasExistingEntity: boolean) => {
  return {
    ...(hasExistingEntity ? dynamicConstants.update : dynamicConstants.create),
    submitFailed: "Failed to save subcategory",
    deleteSuccess: "Category deleted",
    deleteFailed: "Make sure you removed all products from the subcategory first",
  }
}
