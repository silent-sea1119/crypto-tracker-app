import { currencyValueFormat } from "src/utils/numberFromat";
import { ICoin } from "@/types/types";
import PriceTimeChange from "../../../cards/coinCard/price/PriceTimeChange";
import classes from "./CoinStatistic.module.scss";

export const CoinStatistic = ({ item }: { item: ICoin }) => {
  const { symbol, market_data, genesis_date } = item;
  const {
    market_cap,
    total_supply,
    max_supply,
    ath: ath_price,
    ath_change_percentage,
    last_updated,
    circulating_supply,
  } = market_data;

  const marketCap = market_cap.usd ? market_cap.usd : 0;
  const totalSupply = total_supply ? total_supply.toFixed(3) : 0;
  const maxSupply = max_supply ? max_supply : 0;
  const ath = ath_price.usd ? ath_price.usd : 0;
  const athPercent = ath_change_percentage.usd ? ath_change_percentage.usd : 0;
  const lastUpdate = last_updated;
  const circulatingSupply = circulating_supply
    ? circulating_supply.toFixed(3)
    : 0;

  const genesisDateContent = !!genesis_date && (
    <div className={classes.wrapper}>
      <p> Genesis date:</p> <span>{genesis_date}</span>
    </div>
  );
  const marketCapContent = !!marketCap && (
    <div className={classes.wrapper}>
      <p> Market Cap:</p> <span>{currencyValueFormat.format(marketCap)}</span>
    </div>
  );
  const totalSupplyContent = !!totalSupply && (
    <div className={classes.wrapper}>
      <p>Total supply: </p>
      <span>{totalSupply + " " + symbol.toUpperCase()}</span>
    </div>
  );
  const maxSupplyContent = !!maxSupply && (
    <div className={classes.wrapper}>
      <p>Max supply:</p>
      <span>{max_supply + " " + symbol.toUpperCase()}</span>
    </div>
  );
  const circulatingSupplyContent = !!circulatingSupply && (
    <div className={classes.wrapper}>
      <p> Circulating Supply:</p>{" "}
      <span>{circulatingSupply + " " + symbol.toUpperCase()}</span>
    </div>
  );
  const athContent = !!ath && (
    <div className={classes.wrapper}>
      <p>All Time High:</p>
      <span>
        {currencyValueFormat.format(ath) === "$0.00"
          ? ath.toFixed(7)
          : currencyValueFormat.format(ath)}
      </span>
    </div>
  );
  const athPercentageContent = !!athPercent && (
    <div className={classes.wrapper}>
      <p>Price change from ATH:</p>
      <PriceTimeChange time={athPercent} classes={classes} />
    </div>
  );
  const lastUpdateContent = !!lastUpdate && (
    <div className={classes["date-box"]}>
      <p>Last update date (UTC): </p>
      <span className={classes.date}>
        {lastUpdate.replace(/(\d{4})-(\d{2})-(\d{2})T(.{8}).*/, "$4")}
      </span>
    </div>
  );
  return (
    <div className={classes["stats-box"]}>
      <div className={classes.box}>
        {genesisDateContent}
        {marketCapContent}
        {totalSupplyContent}
        {maxSupplyContent}
      </div>
      <div className={classes.box}>
        {circulatingSupplyContent}
        {athContent}
        {athPercentageContent}
        {lastUpdateContent}
      </div>
    </div>
  );
};
