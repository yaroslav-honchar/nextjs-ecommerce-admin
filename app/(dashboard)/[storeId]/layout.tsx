import { Header } from "@/components/header"
import { withStoreId } from "@/hocs/with-store-id"

const DashboardLayout = () => {
  return (
    <>
      <Header />
    </>
  )
}

export default withStoreId(DashboardLayout)
