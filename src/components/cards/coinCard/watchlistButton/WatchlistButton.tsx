import { useDispatch, useSelector } from "react-redux";
import { BiStar } from "react-icons/bi";
import { AppDispatch, RootState } from "@/store/store";
import { AiFillStar } from "react-icons/ai";
import { watchlistActions } from "@/store/watchlist/watchlist-slice";
import { ICurrencyItem } from "@/types/types";

interface Props {
  classes: any;
  id: string;
  item: ICurrencyItem;
}
export const WatchlistButton = ({ classes, id, item }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const watchList = useSelector((state: RootState) => state.watchlist.watchIds);
  const isItemWatch = watchList.find((watchItem) => {
    return watchItem === id;
  });

  const isWatchIcon = isItemWatch ? (
    <AiFillStar fontSize="1.25rem" fill="#df710c" />
  ) : (
    <BiStar color="#df710c" fontSize="1.25rem" />
  );
  const addToWatchlistHandler = () => {
    dispatch(watchlistActions.updateIds(item.id));
    dispatch(watchlistActions.updateItems(item.id));
  };
  return (
    <button className={classes.star} onClick={addToWatchlistHandler}>
      {isWatchIcon}
    </button>
  );
};
