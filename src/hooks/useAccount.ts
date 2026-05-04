import { useState, useCallback, useEffect, useMemo } from "react";
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
  likePoVFirebase,
  unLikePoVFirebase,
  commentOnPoVFirebase,
  uncommentPoVFirebase,
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
import { editPoV, removePov } from "../service/redux/slices/pov/povSlice";
import type { User } from "../models/user.model";
import type { PoV } from "../models/pov.model";
import type { QuerySnapshotCustom } from "../service/firebase/config/firebase-firestore";

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

  const { data: fetchedUserAccount, loading: userAccountLoading } =
    useFetchData<User>(authAccount?.uid ? getUserFirebase : null, authAccount?.uid, {
      notificationHandler,
    });

  const { data: myPoVsData, loading: myPoVsLoading } = useFetchData<QuerySnapshotCustom<PoV>>(
    authAccount?.uid ? (params: any) => getMyPoVsFirebase(authAccount.uid as string, params) : null,
    {},
    { notificationHandler },
  );

  useEffect(() => {
    if (fetchedUserAccount?.exists) {
      dispatch(setUserAccount(fetchedUserAccount));
    }
  }, [fetchedUserAccount, dispatch]);

  useEffect(() => {
    if (myPoVsData) {
      const { lastVisible: _, ...serializableData } = myPoVsData;
      dispatch(setMyPovs(serializableData)); 
    }
  }, [myPoVsData, dispatch]);

  const account = useMemo(() => {
    if (fetchedUserAccount?.exists) return fetchedUserAccount;
    return reduxUserAccount;
  }, [reduxUserAccount, fetchedUserAccount]);

  const handleUpdateUserAccount = useCallback(
    (userData: Partial<User>) => {
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
    (povData: Partial<PoV>) => {
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
    (povData: Partial<PoV>) => {
      const id = povData?.id || Date.now().toString();
      const localPov: PoV = {
        ...povData,
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as PoV;
      dispatch(addPoVLocal(localPov));
      return id;
    },
    [dispatch],
  );

  const updatePov = useCallback(
    (povId: string, povData: Partial<PoV>) => {
      setUpdateLoading(true);
      return updatePoVFirebase(povId, povData)
        .then((response) => {
          dispatch(editMyPov(response));
          dispatch(editPoV(response));
          notify("PoV updated successfully!", "success");
          return response;
        })
        .catch(handleApiError)
        .finally(() => setUpdateLoading(false));
    },
    [handleApiError, notify, dispatch],
  );

  const updatePovLocal = useCallback(
    (povId: string, povData: Partial<PoV>) => {
      const updatedLocalPov: PoV = {
        ...povData,
        id: povId,
        updatedAt: new Date().toISOString(),
      } as PoV;
      dispatch(editPoVLocal(updatedLocalPov));
    },
    [dispatch],
  );

  const deletePov = useCallback(
    (povId: string) => {
      setDeleteLoading(true);
      return deletePoVFirebase(povId)
        .then((response) => {
          if (response) {
            dispatch(removeMyPov(povId)); 
            dispatch(removePov(povId));
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
    (povId: string) => {
      dispatch(removePovLocal(povId));
    },
    [dispatch],
  );

  const handleLike = useCallback(
    (povId: string, accountId: string) => {
      setUpdateLoading(true);
      return likePoVFirebase(povId, accountId)
        .then((response) => {
          dispatch(editMyPov(response));
          dispatch(editPoV(response));
          notify("PoV liked successfully!", "success");
          return response;
        })
        .catch(handleApiError)
        .finally(() => setUpdateLoading(false));
    },
    [handleApiError, notify, dispatch],
  );

  const handleUnlike = useCallback(
    (povId: string, accountId: string) => {
      setUpdateLoading(true);
      return unLikePoVFirebase(povId, accountId)
        .then((response) => {
          dispatch(editMyPov(response));
          dispatch(editPoV(response));
          notify("PoV unliked successfully!", "success");
          return response;
        })
        .catch(handleApiError)
        .finally(() => setUpdateLoading(false));
    },
    [handleApiError, notify, dispatch],
  );

  const handleComment = useCallback(
    (povId: string, accountObj: User, comment: { comment: string }) => {
      setUpdateLoading(true);
      return commentOnPoVFirebase(povId, accountObj, comment)
        .then((response) => {
          dispatch(editMyPov(response));
          dispatch(editPoV(response));
          notify("PoV commented successfully!", "success");
          return response;
        })
        .catch(handleApiError)
        .finally(() => setUpdateLoading(false));
    },
    [handleApiError, notify, dispatch],
  );

  const handleUncomment = useCallback(
    (povId: string, commentId: string | number) => {
      setUpdateLoading(true);
      return uncommentPoVFirebase(povId, commentId)
        .then((response) => {
          dispatch(editMyPov(response));
          dispatch(editPoV(response));
          notify("PoV uncommented successfully!", "success");
          return response;
        })
        .catch(handleApiError)
        .finally(() => setUpdateLoading(false));
    },
    [handleApiError, notify, dispatch],
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
    account: reduxUserAccount,
    myPoVs: reduxMyPovsPage,
    localPoVs: reduxPovsLocalPage,
    createPov,
    updatePov,
    deletePov,
    createPovLocal,
    updatePovLocal,
    deletePovLocal,
    handleLike,
    handleUnlike,
    handleComment,
    handleUncomment,
    loading,
    notification,
    notify,
    closeNotification,
    updateAccount: handleUpdateUserAccount,
    deleteAccount: handleDeleteUserAccount,
  };
};
