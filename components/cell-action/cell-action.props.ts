export interface ICellActionProps<ColumnDataType> {
  data: ColumnDataType
  editPathKey: "sizeEdit" | "categoryEdit" | "billboardEdit" | "colorEdit"
  deleteHandle: (storeId: string, entityId: string) => Promise<void>
}
