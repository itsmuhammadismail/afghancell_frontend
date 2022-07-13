import BgCard from "../components/BgCard";
import CustomersTable from "../components/CustomersTable";
import Layout from "../components/Layout";

const Customer = () => {
  return (
    <Layout heading="Customers">
      <BgCard>
        <CustomersTable />
      </BgCard>
    </Layout>
  );
};

export default Customer;
