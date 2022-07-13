import BgCard from "../components/BgCard";
import Layout from "../components/Layout";
import RechargeTable from "../components/RechargeTable";

const RechargeHistory = () => {
  return (
    <Layout heading="Recharge History">
      <BgCard>
        <RechargeTable />
      </BgCard>
    </Layout>
  );
};

export default RechargeHistory;
