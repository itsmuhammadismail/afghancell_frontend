import BgCard from "../components/BgCard";
import Cards from "../components/Cards";
import Layout from "../components/Layout";
import OrdersChart from "../components/OrdersChart";
import OrdersTable from "../components/OrdersTable";

const Home = () => {
  return (
    <Layout heading="Dashboard">
      <Cards />
      <BgCard className="mt-8">
        <OrdersTable />
      </BgCard>
      <BgCard className="mt-8 shadow-xl p-[2rem]">
        <h2 className="mb-[2rem] text-[1.25rem] ">Orders</h2>
        <div className="w-full h-[30rem] ">
          <OrdersChart />
        </div>
      </BgCard>
    </Layout>
  );
};

export default Home;
