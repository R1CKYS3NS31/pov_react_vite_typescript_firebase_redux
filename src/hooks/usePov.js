import { useDispatch, useSelector } from "react-redux";
import { useFetchData } from "./useFetchData";
import {
  getPoVsPublishedFirebase,
  searchPoVsByTitleFirebase,
} from "../service/firebase/controller/pov-firebase";
import { useNotificationHandler } from "./useNotificationHandler";
import { selectPovsPage } from "../service/redux/selectors/povSelector";
import { setPovs } from "../service/redux/slices/pov/povSlice";
import { useEffect } from "react";

export const usePov = ({
  search = "",
  page = 0,
  size = 12,
  sortBy = "createdAt",
} = {}) => {
  const dispatch = useDispatch();
  
  const notificationHandler = useNotificationHandler();
  const { notification, closeNotification } =
    notificationHandler;

  const reduxPovsPage = useSelector(selectPovsPage);

  // Fetching all PoVs
  const { data: fetchedPovsData, loading: allLoading } = useFetchData(
    getPoVsPublishedFirebase,
    { page, size, sortBy },
    { notificationHandler },
  );

  // Fetching searched PoVs
  const { data: searchedPovsData, loading: searchLoading } = useFetchData(
    search ? () => searchPoVsByTitleFirebase(search) : null,
    search,
    { notificationHandler },
  );

  useEffect(() => {
    if (fetchedPovsData) {
      dispatch(setPovs(fetchedPovsData));
    }
  }, [fetchedPovsData, dispatch]);

  useEffect(() => {
    if (searchedPovsData && search) {
      dispatch(setPovs(searchedPovsData));
    }
  }, [searchedPovsData, search, dispatch]);
  
  const allPovs = fetchedPovsData?.empty ? 
    reduxPovsPage
   : fetchedPovsData;

  const searchedPovs = searchedPovsData?.empty ? 
    reduxPovsPage
  : searchedPovsData;

  return {
    allPovs,
    searchedPovs,
    loading: allLoading || searchLoading,
    closeNotification,
    notification,
  };
};
