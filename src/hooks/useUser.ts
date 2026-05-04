import { useFetchData } from "./useFetchData";
import { getUserFirebase } from "../service/firebase/controller/user-firebase";
import { useNotificationHandler } from "./useNotificationHandler";
import { type User } from "../models/user.model";

export const useUser = (userId: string | null) => { // this is for many users
  const notificationHandler = useNotificationHandler();
  const { notification, closeNotification } = notificationHandler;

  const { data: userProfile, loading } = useFetchData<User>(
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
