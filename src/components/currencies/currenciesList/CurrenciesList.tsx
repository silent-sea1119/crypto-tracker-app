import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CurrenciesSortMenu } from "./currenciesSortMenu/CurrenciesSortMenu";
import CoinCard from "../../cards/coinCard/CoinCard";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import classes from "./CurrenciesList.module.scss";
import { RootState } from "../../../store/store";
import { PaginationBar } from "../paginationBar/PaginationBar";
import { useQuery } from "react-query";
import { getCurrencies } from "./getCurrencies";
import { useRouter } from "next/router";
import { ICurrencyItem } from "@/types/types";
import { changeDataVariables } from "../../../utils/changeDataVariables";
import { sortCurrencies } from "src/utils/sortCurrencies";

export const CurrenciesList = ({ initItems }: { initItems: [] | null }) => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { sortActive } = useSelector((state: RootState) => state.currencies);
  const initDataExist = initItems && !!initItems.length;

  const { data, isError, isLoading, status, isPreviousData, isFetching } =
    useQuery<ICurrencyItem[]>(
      ["currencies", page],
      () => getCurrencies(page, 50),
      {
        keepPreviousData: true,
        // refetchInterval: 35000,
        initialData: initDataExist ? initItems : undefined,
        retry: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    );
  const dataExist = !!data?.length;

  useEffect(() => {
    if (typeof router.query.page === "string") {
      setPage(+router.query.page);
    }
    if (router.asPath === "/") {
      setPage(1);
    }
  }, [router]);

  const LoadingContent = !initDataExist && isLoading && !isPreviousData && (
    <LoadingSpinner />
  );
  const sortItems =
    status === "success"
      ? sortCurrencies(
          data.map((item) => changeDataVariables(item) as ICurrencyItem),
          sortActive
        )
      : [];

  const ItemsRender = sortItems.map((item) => {
    return <CoinCard key={item.id} item={item} />;
  });
  const SortMenu = !isError && !isLoading && (
    <CurrenciesSortMenu page={"home"} />
  );
  const CurrenciesContent = !isLoading && ItemsRender;
  const notFoundContent = !sortItems.length && !isLoading && !isError && (
    <p className="center">Not found items.</p>
  );
  const errorContent = (isError || !dataExist) && !isLoading && !isFetching && (
    <p className="center">Cannot load data.</p>
  );
  const isNewDataFetching = isFetching && isPreviousData;
  const switchPageLoader = isNewDataFetching && (
    <div className={classes.overlay} />
  );
  const enableScroll = isNewDataFetching ? "hidden" : "auto";
  const MarketListContent = dataExist && (
    <div className={classes["market-list"]} style={{ overflowX: enableScroll }}>
      {switchPageLoader}
      {SortMenu}
      {notFoundContent}
      {CurrenciesContent}
    </div>
  );
  const PaginationContent = !isError && !isLoading && dataExist && (
    <PaginationBar
      isLoading={isLoading}
      disabled={isPreviousData || !data}
      page={page}
    />
  );
  return (
    <>
      {LoadingContent}
      {errorContent}
      {MarketListContent}
      {PaginationContent}
    </>
  );
};
