import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNotificationHandler } from "./useNotificationHandler";
import {
  deleteUserFirebase,
  getUserFirebase,
  updateUserFirebase,
} from "../service/firebase/controller/user-firebase";
import { useFetchData } from "./useFetchData";
import { useAuth } from "./useAuth";
import {
  getMyPoVsFirebase,
  savePoVFirebase,
  deletePoVFirebase,
  updatePoVFirebase,
} from "../service/firebase/controller/pov-firebase";
import { selectUserAccount } from "../service/redux/selectors/userAccountSelector";
import {
  setUserAccount,
  editUserAccount,
  removeUserAccount,
} from "../service/redux/slices/user/userAccountSlice";
import { selectMyPovsPage } from "../service/redux/selectors/povSelector";
import { selectPovsLocalPage } from "../service/redux/selectors/povSelector";
import {
  addMyPov,
  editMyPov,
  removeMyPov,
  setMyPovs,
} from "../service/redux/slices/pov/myPovSlice";
import {
  addPoVLocal,
  editPoVLocal,
  removePovLocal,
} from "../service/redux/slices/pov/povLocalSlice";

export const useAccount = () => {
  const dispatch = useDispatch();

  const [updateUserAccountLoading, setUpdateUserAccountLoading] =
    useState(false);
  const [deleteUserAccountLoading, setDeleteUserAccountLoading] =
    useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const notificationHandler = useNotificationHandler();
  const { notification, notify, closeNotification, handleApiError } =
    notificationHandler;

  const { isAuthenticated, account: authAccount } = useAuth();
  const reduxUserAccount = useSelector(selectUserAccount);

  const reduxMyPovsPage = useSelector(selectMyPovsPage);
  const reduxPovsLocalPage = useSelector(selectPovsLocalPage);

  const { data: userAccount, loading: userAccountLoading } = useFetchData(
    authAccount?.uid ? getUserFirebase : null,
    authAccount?.uid,
    { notificationHandler },
  );

  const { data: myPoVsData, loading: myPoVsLoading } = useFetchData(
    authAccount?.uid ? getMyPoVsFirebase : null,
    authAccount?.uid,
    { notificationHandler },
  );

  useEffect(() => {
    if (userAccount?.exists) {
      dispatch(setUserAccount(userAccount));
    } else if (authAccount?.exists) {
      dispatch(setUserAccount(authAccount));
    }
  }, [userAccount, authAccount, dispatch]);

  useEffect(() => {
    if (!myPoVsData?.empty) {
      dispatch(setMyPovs(myPoVsData));
    }
  }, [myPoVsData, dispatch]);

  const account = userAccount?.exists
    ? userAccount
    : authAccount?.exists
      ? authAccount
      : reduxUserAccount;

  const myPoVs = myPoVsData?.empty ? reduxMyPovsPage : myPoVsData;

  const handleUpdateUserAccount = useCallback(
    (userData) => {
      setUpdateUserAccountLoading(true);
      const uid = account?.uid || account?.id;
      if (!uid) return;
      if (!isAuthenticated) {
        dispatch(editUserAccount(userData));
        notify("You must be logged in to update your account!", "error");
        return;
      }
      return updateUserFirebase(uid, userData)
        .then((response) => {
          dispatch(editUserAccount(response));
          notify("User account updated successfully!", "success");
          return response;
        })
        .catch(handleApiError)
        .finally(() => setUpdateUserAccountLoading(false));
    },
    [notify, handleApiError, isAuthenticated, account, dispatch],
  );

  const handleDeleteUserAccount = useCallback(() => {
    setDeleteUserAccountLoading(true);
    const uid = account?.uid || account?.id;
    if (!uid) return;
    if (!isAuthenticated) {
      dispatch(removeUserAccount());
      notify("You must be logged in to delete your account!", "error");
      return;
    }
    return deleteUserFirebase(uid)
      .then((response) => {
        dispatch(removeUserAccount());
        notify("User account deleted successfully!", "success");
        return response;
      })
      .catch(handleApiError)
      .finally(() => setDeleteUserAccountLoading(false));
  }, [notify, handleApiError, isAuthenticated, account, dispatch]);

  const createPov = useCallback(
    (povData) => {
      setCreateLoading(true);
      return savePoVFirebase(povData)
        .then((response) => {
          dispatch(addMyPov(response));
          notify("PoV created successfully!", "success");
          return response;
        })
        .catch(handleApiError)
        .finally(() => setCreateLoading(false));
    },
    [handleApiError, notify, dispatch],
  );

  const createPovLocal = useCallback(
    (povData) => {
      const id = povData?.id || Date.now();
      const localPov = {
        ...povData,
        id,
        createdAt: new Date().toISOString(),
      };
      dispatch(addPoVLocal(localPov));
      return id;
    },
    [dispatch],
  );

  const updatePov = useCallback(
    (povId, povData) => {
      setUpdateLoading(true);
      return updatePoVFirebase(povId, povData)
        .then((response) => {
          dispatch(editMyPov(response));
          notify("PoV updated successfully!", "success");
          return response;
        })
        .catch(handleApiError)
        .finally(() => setUpdateLoading(false));
    },
    [handleApiError, notify, dispatch],
  );

  const updatePovLocal = useCallback(
    (povId, povData) => {
      const updatedLocalPov = {
        ...povData,
        id: povId,
        updatedAt: new Date().toISOString(),
      };
      dispatch(editPoVLocal(updatedLocalPov));
    },
    [dispatch],
  );

  const deletePov = useCallback(
    (povId) => {
      setDeleteLoading(true);
      return deletePoVFirebase(povId)
        .then((response) => {
          if (response) {
            dispatch(removeMyPov(povId));
            notify("PoV deleted successfully!", "success");
          }
          return response;
        })
        .catch(handleApiError)
        .finally(() => setDeleteLoading(false));
    },
    [handleApiError, notify, dispatch],
  );

  const deletePovLocal = useCallback(
    (povId) => {
      dispatch(removePovLocal(povId));
    },
    [dispatch],
  );

  const loading =
    userAccountLoading ||
    updateUserAccountLoading ||
    deleteUserAccountLoading ||
    createLoading ||
    updateLoading ||
    deleteLoading ||
    myPoVsLoading;

  return {
    account,
    myPoVs,
    localPoVs: reduxPovsLocalPage,
    createPov,
    updatePov,
    deletePov,
    createPovLocal,
    updatePovLocal,
    deletePovLocal,
    loading,
    notification,
    closeNotification,
    updateAccount: handleUpdateUserAccount,
    deleteAccount: handleDeleteUserAccount,
  };
};
