export interface ICellActionProps<ColumnDataType> {
  data: ColumnDataType
  editPathKey: "sizeEdit" | "categoryEdit" | "billboardEdit"
  deleteHandle: (storeId: string, entityId: string) => Promise<void>
}
