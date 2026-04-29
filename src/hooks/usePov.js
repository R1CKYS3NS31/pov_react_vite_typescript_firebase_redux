import { useDispatch, useSelector } from "react-redux";
import { useFetchData } from "./useFetchData";
import {
  getPoVsPublishedFirebase,
  searchPoVsByTitleFirebase,
} from "../service/firebase/controller/pov-firebase";
import { useNotificationHandler } from "./useNotificationHandler";
import { selectPovsPage } from "../service/redux/selectors/povSelector";
import { setPovs, appendPovs } from "../service/redux/slices/pov/povSlice";
import { useEffect, useCallback, useState } from "react";

export const usePov = ({
  search = "",
  size = 12,
  sortBy = "createdAt",
} = {}) => {
  const dispatch = useDispatch();
  const [lastVisible, setLastVisible] = useState(null);

  const notificationHandler = useNotificationHandler();
  const { notification, closeNotification } = notificationHandler;

  const reduxPovsPage = useSelector(selectPovsPage);

  // Reset lastVisible when filters change to start a new page sequence
  useEffect(() => {
    setLastVisible(null);
  }, [search, sortBy, size]);

  const { data: fetchedPovsData, loading } = useFetchData(
    search ? searchPoVsByTitleFirebase : getPoVsPublishedFirebase,
    {
      searchTitle: search,
      size,
      sortBy,
      lastVisible,
    },
    { notificationHandler },
  );

  useEffect(() => {
    if (fetchedPovsData) {
      if (lastVisible) {
        dispatch(appendPovs(fetchedPovsData));
      } else {
        dispatch(setPovs(fetchedPovsData));
      }
    }
  }, [fetchedPovsData, dispatch, lastVisible]);

  // const allPovs = useMemo(() => {
  //   if (fetchedPovsData?.empty) return reduxPovsPage;
  //   return fetchedPovsData;
  // }, [fetchedPovsData, reduxPovsPage]);

  // const searchedPovs = useMemo(() => {
  //   if (searchedPovsData?.empty) return reduxPovsPage;
  //   return searchedPovsData;
  // }, [searchedPovsData, reduxPovsPage]);

  const loadMore = useCallback(() => {
    if (reduxPovsPage.last || loading || !fetchedPovsData?.lastVisible) return;
    setLastVisible(fetchedPovsData.lastVisible);
  }, [reduxPovsPage.last, loading, fetchedPovsData]);

  return {
    povs: reduxPovsPage,
    hasMore: !reduxPovsPage.last && !!fetchedPovsData?.lastVisible && !loading,
    loading,
    loadMore,
    closeNotification,
    notification,
  };
};
