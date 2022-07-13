import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { CircularProgress } from "@mui/material";
import getRechargeHistory from "../api/get_recharge_history";

const columns = [
  "Sr.No",
  "User ID",
  "Name",
  "Contact", 
  "Amount",
];

const options = {
  filterType: "checkbox",
};

const RechargeTable = () => {
  const [data, setData] = useState(null);
  const [cookie] = useCookies(["token"]);

  const fetchData = async () => {
    const res = await getRechargeHistory(cookie["token"], cookie["id"]);
    console.log(res);
    let data = [];
    let sr = 1;
    res.map((r) => {
      data.push([
        sr++,
        r.user,
        r.username,
        r.contact,
        r.amount,
      ]);
    });
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    {data ?
    <MUIDataTable
      title={"Recharge History List"}
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

export default RechargeTable;
