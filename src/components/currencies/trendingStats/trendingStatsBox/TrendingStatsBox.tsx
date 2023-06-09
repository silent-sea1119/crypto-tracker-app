import classes from "./TrendingStatsBox.module.scss";
import TrendingCoin from "../trendingCoin/TrendingCoin";
import { memo, useState } from "react";
import { FcFlashOn, FcRightDown, FcRightUp } from "react-icons/fc";
import { Modal } from "../../../ui/modals/Modal";
import { StatsModal } from "../statsModal/StatsModal";
//types
import { ICurrencyItem } from "../../../../types/types";

interface Props {
  kind: string;
  title: string;
  items: ICurrencyItem[];
}
const TrendingStatsBox = ({ kind, title, items }: Props) => {
  const [modalActive, setModalActive] = useState(false);

  let icon;
  let filterType: ICurrencyItem[] = [];

  const trending = kind === "trending";
  const losers = kind === "losers";
  const gainers = kind === "gainers";

  if (trending) {
    icon = <FcFlashOn fontSize="1.3rem" />;
    filterType = items.filter((item) => item.price_change_7d > 0);
  }
  if (losers) {
    icon = <FcRightDown fontSize="1.3rem" />;
    filterType = items.filter((item) => item.price_change_24h < 0);
  }
  if (gainers) {
    icon = <FcRightUp fontSize="1.3rem" />;
    filterType = items.filter((item) => item.price_change_24h > 0.01);
  }
  const TopThreeView = filterType.slice(0, 3).map((item, index: number) => {
    const percentage = trending ? item.price_change_7d : item.price_change_24h;
    return (
      <TrendingCoin
        key={item.id}
        id={item.id}
        number={index + 1}
        image={item.image}
        name={item.name}
        alias={item.symbol}
        percentage={percentage}
      />
    );
  });
  const moreItems = filterType.map((item, index: number) => {
    const percentage = trending ? item.price_change_7d : item.price_change_24h;
    return (
      <TrendingCoin
        key={item.id}
        id={item.id}
        number={index + 1}
        image={item.image}
        name={item.name}
        alias={item.symbol}
        percentage={percentage}
      />
    );
  });
  const moreStatsHandler = () => {
    setModalActive((state) => !state);
  };

  let BoxContent;
  if (filterType.length !== 0) {
    BoxContent = modalActive && (
      <Modal onClose={moreStatsHandler}>
        <h3 style={{ padding: "10px 0px" }}>{title}</h3>
        <StatsModal>{moreItems}</StatsModal>
      </Modal>
    );
  }
  if (filterType.length === 0) {
    BoxContent = <h3 className={classes.empty}>No {kind}</h3>;
  }
  const buttonState = !items.length && true;

  return (
    <div className={classes.box}>
      <div className={classes.titles}>
        <div className={classes["title-box"]}>
          <h2>{title}</h2>
          {icon}
        </div>
        <button
          onClick={moreStatsHandler}
          disabled={buttonState}
          className={classes["more-button"]}
        >
          More
        </button>
      </div>
      {BoxContent}

      {TopThreeView}
    </div>
  );
};

export default memo(TrendingStatsBox);
