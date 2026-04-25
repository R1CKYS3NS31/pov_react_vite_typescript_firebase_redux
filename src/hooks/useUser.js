import { useFetchData } from "./useFetchData";
import { getUserFirebase } from "../service/firebase/controller/user-firebase";
import { useNotificationHandler } from "./useNotificationHandler";

export const useUser = (userId) => {
  const notificationHandler = useNotificationHandler();
  const { notification, closeNotification } = notificationHandler;

  const { data: userProfile, loading } = useFetchData(
    userId ? getUserFirebase : null,
    userId,
    { notificationHandler },
  );
  
  return {
    userProfile,
    loading,
    notification,
    closeNotification,
  };
};
