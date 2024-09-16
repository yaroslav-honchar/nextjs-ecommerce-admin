const dynamicConstants = {
  create: {
    title: "Create product",
    description: "Creating store product",
    submitSuccess: "Product created",
    submitFailed: "Product editing saved",
    action: "Create",
  },
  update: {
    title: "Edit product",
    description: "Managing store of product",
    submitSuccess: "Product editing saved",
    action: "Edit",
  },
}

export const getFormConstants = (hasExistingEntity: boolean) => {
  return {
    ...(hasExistingEntity ? dynamicConstants.update : dynamicConstants.create),
    submitFailed: "Failed to save product",
    deleteSuccess: "Product deleted",
    deleteFailed: "Something went wrong",
  }
}
