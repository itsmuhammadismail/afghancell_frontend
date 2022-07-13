import BgCard from "../components/BgCard";
import Layout from "../components/Layout";
import OrdersTable from "../components/OrdersTable";

const Order = () => {
  return (
    <Layout heading="Orders">
      <BgCard>
        <OrdersTable />
      </BgCard>
    </Layout>
  );
};

export default Order;
