import { Button } from "@mui/material";
import Link from "next/link";
import BgCard from "../components/BgCard";
import CustomersTable from "../components/CustomersTable";
import Layout from "../components/Layout";

const Customer = () => {
  return (
    <Layout heading="Customers">
      <div className="pl-[2rem] pb-[2rem]">
        <Link href="/add-customer">
          <Button
              variant="contained"
              className="bg-[#377DFF] md:w-[20rem] h-[3rem]"
              type="submit"
            >
            Add Customer
            </Button>
        </Link>
      </div>
      <BgCard>
        <CustomersTable />
      </BgCard>
    </Layout>
  );
};

export default Customer;
