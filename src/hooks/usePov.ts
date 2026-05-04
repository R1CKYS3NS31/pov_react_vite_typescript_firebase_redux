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
import type { PoV } from "../models/pov.model";
import type { QuerySnapshotCustom } from "../service/firebase/config/firebase-firestore";

interface UsePovParams {
  search?: string;
  size?: number;
  sortBy?: string;
}

export const usePov = ({
  search = "",
  size = 12,
  sortBy = "createdAt",
}: UsePovParams = {}) => {
  const dispatch = useDispatch();
  const [lastVisible, setLastVisible] = useState<any>(null);

  const notificationHandler = useNotificationHandler();
  const { notification, closeNotification } = notificationHandler;

  const reduxPovsPage = useSelector(selectPovsPage);

  // Reset lastVisible when filters change to start a new page sequence
  useEffect(() => {
    setLastVisible(null);
  }, [search, sortBy, size]);

  const { data: fetchedPovsData, loading } = useFetchData<QuerySnapshotCustom<PoV>>(
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
      const { lastVisible: _, ...serializableData } = fetchedPovsData;
      if (lastVisible) {
        dispatch(appendPovs(serializableData));
      } else {
        dispatch(setPovs(serializableData));
      }
    }
  }, [fetchedPovsData, dispatch, lastVisible]);

  const loadMore = useCallback(() => {
    if (reduxPovsPage.last || loading || !fetchedPovsData?.lastVisible) return;
    setLastVisible(fetchedPovsData.lastVisible);
  }, [reduxPovsPage.last, loading, fetchedPovsData]);

  return {
    povs: reduxPovsPage,
    hasMore: !reduxPovsPage.last && !!fetchedPovsData?.lastVisible && !loading,
    loading,
    loadingMore: loading && !!lastVisible,
    loadMore,
    closeNotification,
    notification,
  };
};
