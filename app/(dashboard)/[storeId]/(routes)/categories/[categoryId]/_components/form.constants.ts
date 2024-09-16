const dynamicConstants = {
  create: {
    title: "Create category",
    description: "Creating store category",
    submitSuccess: "Category created",
    submitFailed: "Category editing saved",
    action: "Create",
  },
  update: {
    title: "Edit category",
    description: "Managing store of category",
    submitSuccess: "Category editing saved",
    action: "Edit",
  },
}

export const getFormConstants = (hasExistingEntity: boolean) => {
  return {
    ...(hasExistingEntity ? dynamicConstants.update : dynamicConstants.create),
    submitFailed: "Failed to save category",
    deleteSuccess: "Category deleted",
    deleteFailed: "Make sure you removed all products from the category first",
  }
}
