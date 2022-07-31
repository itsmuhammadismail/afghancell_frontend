import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import getUsersApi from "../api/get_users";
import { CircularProgress } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import deleteUserApi from "../api/delete_user";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const columns = [
  "Sr.No",
  "User ID",
  "Name",
  "Contact",
  "User Type",
  "Wallet",
  "State",
  "Action",
];

const options = {
  filterType: "checkbox",
};

const CustomersTable = () => {
  const [data, setData] = useState(null);
  const [cookie] = useCookies(["token"]);
  const MySwal = withReactContent(Swal);

  const deleteUser = async (id) => {
    console.log(id);
    await MySwal.fire({
      title: "Are you sure? you want to delete this user",
      icon: 'question',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteUserApi(cookie["token"], id);
        await fetchData();
      } 
    });
    
  }

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
        <CloseIcon className="cursor-pointer" key={r.user_id} onClick={() => deleteUser(r._id)} />
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
