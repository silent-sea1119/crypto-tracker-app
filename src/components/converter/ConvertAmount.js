import { useDispatch, useSelector } from "react-redux";
import { convertActions } from "../../store/convert-slice";

import classes from "./ConvertItem.module.scss";

export const ConvertAmount = () => {
  const interNumberFormat = new Intl.NumberFormat("en-US");

  const amount = useSelector((state) => state.convert.quantity);
  const dispatch = useDispatch();

  const inputChangeHandler = (event) => {
    const value = event.target.value;

    if (value < 0 || value.length >= "11") return;
    dispatch(convertActions.changeQuantity(+value));
  };
  return (
    <div className={classes.box}>
      <div className={classes.selects}>
        <label htmlFor="amount">Amount:</label>
        <input
          name="amount"
          id="amount"
          type="number"
          value={amount}
          onChange={inputChangeHandler}
          className={classes.amount}
        />
      </div>
    </div>
  );
};
