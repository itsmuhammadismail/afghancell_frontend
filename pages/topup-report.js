import BgCard from "../components/BgCard";
import TopupReportTable from "../components/TopupReportTable";
import Layout from "../components/Layout";

const TopupReport = () => {
  return (
    <Layout heading="Topup Report">
      <BgCard>
        <TopupReportTable />
      </BgCard>
    </Layout>
  );
};

export default TopupReport;
