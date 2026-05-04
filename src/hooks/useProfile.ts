import { useMemo } from "react";
import { useFetchData } from "./useFetchData";
import { getUserFirebase } from "../service/firebase/controller/user-firebase";
import { getPoVsByAuthorFirebase } from "../service/firebase/controller/pov-firebase";
import { useNotificationHandler } from "./useNotificationHandler";
import { type User } from "../models/user.model";
import { type PoV } from "../models/pov.model";
import { type QuerySnapshotCustom } from "../service/firebase/config/firebase-firestore";

export const useProfile = (userId: string | null) => {
  const notificationHandler = useNotificationHandler();
  const { notification, closeNotification } = notificationHandler;

  const { data: profile, loading: loadingProfile } = useFetchData<User>(
    userId ? getUserFirebase : null,
    userId,
    { notificationHandler },
  );

  const { data: userPovsData, loading: loadingPovs } = useFetchData<QuerySnapshotCustom<PoV>>(
    userId ? getPoVsByAuthorFirebase : null,
    userId,
    { notificationHandler },
  );

  // Return data directly — do NOT dispatch into the global povs slice or it
  // will overwrite the public feed whenever a profile page is viewed.
  const userPovs = useMemo(() => {
    return userPovsData?.empty
      ? { size: 0, empty: true, content: [], lastVisible: null, last: true }
      : userPovsData;
  }, [userPovsData]);

  return {
    profile,
    userPovs,
    loadingProfile: loadingProfile || loadingPovs,
    notification,
    closeNotification,
  };
};
