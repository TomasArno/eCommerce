import { useContext } from "react";
import { GlobalContext } from "../../main";
import { useNavigate } from "react-router-dom";

function OrderCard({ photo, state, title, units, date }) {
  const { getState } = useContext(GlobalContext);
  const navigate = useNavigate();

  // function handleBtn() {
  //   const { isLoggedIn } = getState();
  //   if (isLoggedIn) {
  //     ("");
  //   } else {
  //     navigate("/login");
  //   }
  // }

  return <button></button>;
}

export default OrderCard;
