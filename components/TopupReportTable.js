import MUIDataTable from "mui-datatables";
import CheckIcon from "@mui/icons-material/Check";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import getOrderHistoryApi from "../api/get_order_history";
import { CircularProgress } from "@mui/material";

const columns = [
  "Sr.No",
  "User ID",
  "Name",
  "Contact",
  "Operator",
  "Topup No",
  "Amount",
  "Date of Txn",
  "State",
  "Status",
];

const options = {
  filterType: "checkbox",
};

const TopupTable = () => {
  const [data, setData] = useState(null);
  const [cookie] = useCookies(["token"]);
  const [total, setTotal] = useState(0);

  const [value, setValue] = useState(null);

  const fetchData = async () => {
    const res = await getOrderHistoryApi(cookie["token"]);
    console.log(res);
    let data = [];
    let sr = 1;
    res.map((r) => {
      let datetime = r.createdAt;
      let [date, time] = datetime.split("T");
      setTotal((total += +r.credit));
      data.push([
        sr++,
        r.user.user_id,
        r.user.username,
        r.user.contact,
        r.operataor,
        r.topup_no,
        r.amount,
        `${date} ${time.slice(0, 8)}`,
        r.user.state,
        r.action === "approve" ? (
          <DoneIcon color="success" />
        ) : (
          <CloseIcon color="error" />
        ),
      ]);
    });
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      {data ? (
        <MUIDataTable
          title={"Topup List"}
          data={data}
          columns={columns}
          options={options}
        />
      ) : (
        <div className="h-[20rem] flex justify-center items-center">
          <CircularProgress />
        </div>
      )
      }
    </div>
  );
};

export default TopupTable;
