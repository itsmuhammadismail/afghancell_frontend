import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import Card from "./Card";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GroupIcon from "@mui/icons-material/Group";
import getTotalOrdersApi from "../api/get_total_order";

const Cards = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const [orders, setOrders] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [totalSpend, setTotalSpend] = useState(null);
  const [totalCreditPerDay, settotalCreditPerDay] = useState(null);
  const [totalOrderPerDay, setTotalOrderPerDay] = useState(null);

  const fetchData = async () => {
    const res = await getTotalOrdersApi(cookie["token"]);
    console.log(res);
    setOrders(res.totalorder);
    setCustomers(res.user);
    setTotalAmount(res.debit);
    setTotalSpend(res.credit);
    settotalCreditPerDay(res.totalCreditPerDay);
    setTotalOrderPerDay(res.totalOrderPerDay);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-[2rem] flex flex-wrap gap-6">
      <Card
        name="Total Orders"
        value={orders}
        icon={<ShoppingCartIcon />}
        color="#F7CE46"
        bgColor="#FFF8DD"
      />
      <Card
        name="Total Amount"
        value={totalAmount}
        icon={<AttachMoneyIcon />}
        color="#009EF7"
        bgColor="#F1FAFF"
      />
      <Card
        name="Total Spent"
        value={totalSpend}
        icon={<AccountBalanceWalletIcon />}
        color="#10B981"
        bgColor="#E8FFF3"
      />
      <Card
        name="Total Customers"
        value={customers}
        icon={<GroupIcon />}
        color="#F1416C"
        bgColor="#FFF5F8"
      />
      
    </div>
  );
};

export default Cards;
