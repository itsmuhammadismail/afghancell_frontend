import MUIDataTable from "mui-datatables";
import CheckIcon from "@mui/icons-material/Check";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import getOrderHistoryApi from "../api/get_order_history";
import { CircularProgress } from "@mui/material";
import getPendingOrderApi from "../api/get_pending_order";
import OrderActionApi from "../api/order_action";

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
  "Action",
];

const options = {
  filterType: "checkbox",
};

const TopupTable = () => {
  const [data, setData] = useState(null);
  const [cookie] = useCookies(["token"]);
  const [total, setTotal] = useState(0);

  const [value, setValue] = useState(null);

  const orderAction = async (id, action) => {
    const res = await OrderActionApi(cookie["token"], id, action);
    if (res == 200) {
      setData(null);
      await fetchData();
    }
  }

  const fetchData = async () => {
    const res = await getPendingOrderApi(cookie["token"]);
    console.log(res);
    let data = [];
    let sr_in = 1;
    res.map((r, index) => {
      let datetime = r.createdAt;
      let [date, time] = datetime.split("T");
      setTotal((total += +r.credit));
      let sr = sr_in
      data.push([
        sr,
        r.user.user_id,
        r.user.username,
        r.user.contact,
        r.operataor,
        r.topup_no,
        r.amount,
        `${date} ${time.slice(0, 8)}`,
        r.user.state,
        <div key={r.user.user_id} className="flex gap-2">
          <div className="border border-gray-600 cursor-pointer" onClick={() => orderAction(r._id, "approve")}>
            <DoneIcon color="success" />
          </div>
          <div className="border border-gray-600 cursor-pointer" onClick={() => orderAction(r._id, "deny")}>
          <CloseIcon color="error" />
          </div>
        </div>,  
      ]);
      sr_in++;
    });
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);


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
