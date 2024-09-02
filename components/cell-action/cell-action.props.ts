export interface ICellActionProps<ColumnDataType> {
  data: ColumnDataType
  editPathKey: "sizeEdit" | "categoryEdit" | "billboardEdit" | "colorEdit" | "productEdit"
  deleteHandle: (storeId: string, entityId: string) => Promise<void>
}
