import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import getUsersApi from "../api/get_users";
import { CircularProgress } from "@mui/material";

const columns = [
  "Sr.No",
  "User ID",
  "Name",
  "Contact",
  "User Type",
  "Wallet",
  "State",
];

// const data = [
//   ["1", "AFG4567", "ZAINUDDIN", "+923118976543", "Destributor", "200", "Sindh"],
//   ["1", "AFG4567", "ZAINUDDIN", "+923118976543", "Destributor", "200", "Sindh"],
//   ["1", "AFG4567", "ZAINUDDIN", "+923118976543", "Destributor", "200", "Sindh"],
//   ["1", "AFG4567", "ZAINUDDIN", "+923118976543", "Destributor", "200", "Sindh"],
//   ["1", "AFG4567", "ZAINUDDIN", "+923118976543", "Destributor", "200", "Sindh"],
//   ["1", "AFG4567", "ZAINUDDIN", "+923118976543", "Destributor", "200", "Sindh"],
// ];

const options = {
  filterType: "checkbox",
};

const CustomersTable = () => {
  const [data, setData] = useState(null);
  const [cookie] = useCookies(["token"]);

  const fetchData = async () => {
    const res = await getUsersApi(cookie["token"]);
    console.log(res);
    let data = [];
    let sr = 1;
    res.map((r) => {
      let datetime = r.createdAt;
      data.push([
        sr++,
        r.user_id,
        r.displayname,
        r.contact,
        r.role,
        r.amount,
        r.state,
      ]);
    });
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
   {data ? <MUIDataTable
      title={"Customer List"}
      data={data}
      columns={columns}
      options={options}
    /> : (
      <div className="h-[20rem] flex justify-center items-center">
        <CircularProgress />
      </div>
    )}
    </>
  );
};

export default CustomersTable;
