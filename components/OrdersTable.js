import MUIDataTable from "mui-datatables";
import CheckIcon from "@mui/icons-material/Check";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import getPendingOrderApi from "../api/get_pending_order";
import OrderActionApi from "../api/order_action";
import { useRef } from "react";

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

let dataArray = [];

function arrayEquals(a, b) {
  return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length;
}

const OrdersTable = () => {
  const [data, setData] = useState(null);
  const [cookie] = useCookies(["token"]);
  const [total, setTotal] = useState(0);

  const [value, setValue] = useState(null);
  const audioRef = useRef();

  const orderAction = async (id, action) => {
    const res = await OrderActionApi(cookie["token"], id, action);
    if (res == 200) {
      setData(null);
      await changeData();
    }
  }

  const fetchData = async () => {
    const res = await getPendingOrderApi(cookie["token"]);
    let fetchedData = [];
    let sr_in = 1;
    res.map((r, index) => {
      let datetime = r.createdAt;
      let [date, time] = datetime.split("T");
      setTotal((total += +r.credit));
      let sr = sr_in
      fetchedData.push([
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
    
    return fetchedData;
  };

  const changeData = async () => {
    let oldData = dataArray;
    let newData = await fetchData();
    console.log(newData);
    dataArray = newData;
    setData(newData);
    if(!arrayEquals(oldData, newData)){
      audioRef.current.play();
    }      
  }

  useEffect(() => {
    Audio.prototype.play = (function(play) {
      return function () {
        var audio = this,
            args = arguments,
            promise = play.apply(audio, args);
        if (promise !== undefined) {
          promise.catch(_ => {
            // // Autoplay was prevented. This is optional, but add a button to start playing.
            // var el = document.createElement("button");
            // el.style.display = "none";
            // el.innerHTML = "Play";
            // el.addEventListener("click", function(){play.apply(audio, args);});
            // this.parentNode.insertBefore(el, this.nextSibling)
          });
        }
      };
      })(Audio.prototype.play);

    const interval = setInterval(() => {
      changeData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      <audio ref={audioRef} src="/sound/iphone_sound.mp3" type="audio/mpeg" autoPlay={true} />
      {data ? (
        <MUIDataTable
          title={"Orders List"}
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

export default OrdersTable;
