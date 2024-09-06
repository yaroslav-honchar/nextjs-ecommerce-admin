import { CreditCard, DollarSign } from "lucide-react"
import { getGraphRevenue } from "@/actions/get-graph-revenue"
import { getSalesCount } from "@/actions/get-sales-count"
import { getStockCount } from "@/actions/get-stock-count"
import { getTotalRevenue } from "@/actions/get-total-revenue"
import { Overview } from "@/components/overview/overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { withStoreId } from "@/hocs/with-store-id"
import { priceFormatter } from "@/lib/price-formatter.lib"
import type { IPropsWithStoreidParamAndStore } from "@/types/pages-props.interface"

const DashboardPage = async ({ store }: Readonly<IPropsWithStoreidParamAndStore>) => {
  const totalRevenue = await getTotalRevenue(store.id)
  const sales = await getSalesCount(store.id)
  const productsInStock = await getStockCount(store.id)
  const graphRevenue = await getGraphRevenue(store.id)

  return (
    <>
      <Heading
        title={"Overview"}
        description={`Overview of ${store.name}`}
      />
      <Separator className={"my-5"} />
      <div className="flex flex-col gap-5">
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className={"flex flex-row gap-2 items-center justify-between"}>
              <CardTitle className={"text-sm font-medium"}>Total Revenue</CardTitle>
              <DollarSign className={"size-4 text-muted-foreground"} />
            </CardHeader>
            <CardContent>
              <div className={"text-2xl font-bold"}>{priceFormatter(totalRevenue)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className={"flex flex-row gap-2 items-center justify-between"}>
              <CardTitle className={"text-sm font-medium"}>Sales</CardTitle>
              <CreditCard className={"size-4 text-muted-foreground"} />
            </CardHeader>
            <CardContent>
              <div className={"text-2xl font-bold"}>+{sales}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className={"flex flex-row gap-2 items-center justify-between"}>
              <CardTitle className={"text-sm font-medium"}>Products In Stock</CardTitle>
              <CreditCard className={"size-4 text-muted-foreground"} />
            </CardHeader>
            <CardContent>
              <div className={"text-2xl font-bold"}>{productsInStock}</div>
            </CardContent>
          </Card>
        </div>
        <Card className={"col-span-4"}>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className={"ps-2"}>
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
export default withStoreId(DashboardPage)
