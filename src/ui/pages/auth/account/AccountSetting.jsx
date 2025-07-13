import { MainCard } from "../../../components/ui/cards/MainCard";
import { Alert, AlertTitle, Grid2, Snackbar } from "@mui/material";
import { SubCard } from "../../../components/ui/cards/SubCard";
import { UserForm } from "../../../components/auth/account/UserForm";
import { PasswordForm } from "../../../components/auth/account/PasswordForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  currentUser,
  isUserSignedIn,
} from "../../../../services/firebase/config/firebase-auth";
import {
  getUserFirebase,
  updateUserFirebase,
} from "../../../../services/firebase/controller/user-firebase";
import { ErrorSnackbar } from "../../../components/ui/snackbar/ErrorSnackbar";

export const AccountSetting = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openErrorSnackBar, setOpen] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");

  const [userAccount, setUserAccount] = useState({
    exists: false,
    uid: "",
    name: { first: "", last: "" },
  });

  useEffect(() => {
    const user = currentUser();
    if (user) {
      getUserFirebase(user.uid)
        .then((userFirebase) => {
          if (userFirebase.exists) {
            setUserAccount(userFirebase);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    !userAccount.exists && navigate("/signin");
  }, [userAccount, navigate]);

  const handleCloseErrorSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmitUser = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const data = new FormData(event.currentTarget);

      // user register
      const firstName = data.get("firstName");
      const lastName = data.get("lastName");
      const email = data.get("email");
      const tel = data.get("tel");
      const description = data.get("description");
      const seller = !!data.get("seller");
      // const displayPicture = data.get("displayPicture");

      // handle changes in input fields
      // const handleInputChange = (event) => {
      //   const { name, value } = event.target;
      //   if (name === "first" || name === "last") {
      //     setEditedUser({
      //       ...editedUser,
      //       name: {
      //         ...editedUser.name,
      //         [name]: value,
      //       },
      //     });
      //   } else {
      //     setEditedUser({ ...editedUser, [name]: value });
      //   }
      // };

      const user = {
        name: {
          first: firstName,
          last: lastName,
        },
        email: email,
        description: description,
        seller: seller,
        tel: tel,
        // displayPicture: displayPicture,
      };
      await updateUserHandle(user);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setOpen(true);
    }
  };

  const handleSubmitPassword = async (event) => {
    // event.preventDefault();
    // setLoading(true);
    // const data = new FormData(event.currentTarget);
    // const dataObject = Object.fromEntries(data.entries());
    // try {
    //   const token = await auth.isAuthenticated();
    //   // console.log("user: ", token);
    //   if (token) {
    //     const fetchedUserAccount = await fetchUserAccount(token);
    //     const userAccountPassword = await fetchedUserAccount.password; // ricky has bugs - no returning pass - improvise new GET pass @ server
    //     if (userAccountPassword === dataObject.currentPassword) {
    //       if (dataObject.newPassword === dataObject.confirmPassword) {
    //         // console.log(dataObject.newPassword);
    //         await updateUserHandle({
    //           password: dataObject.newPassword,
    //         });
    //       } else {
    //         setErrorPassword("*please match the correct password");
    //       }
    //     } else {
    //       setErrorPassword("*incorrect current password");
    //     }
    //   } else {
    //     setErrorPassword("*please sign-in");
    //   }
    // } catch (error) {
    //   setErrorPassword(`*${error}`);
    // } finally {
    //   setLoading(false);
    // }
  };

  const updateUserHandle = async (user) => {
    if (isUserSignedIn()) {
      updateUserFirebase(userAccount.uid, user)
        .then((updatedUserAccount) => {
          setUserAccount(updatedUserAccount);
          setLoading(false);
        })
        .catch((error) => {
          // alert(error)
          setLoading(false);
          setError(error.message);
          setOpen(true);
        });
      // console.log("user account: ", updatedUserAccount); // remove log
    } else {
      setError("*please sign-in");
      setLoading(false);
    }
  };

  return (
    <MainCard title={"Account Setting"} sx={{ pb: 5 }}>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} lg={6}>
          <SubCard title={"User"}>
            <UserForm
              handleSubmitUser={handleSubmitUser}
              updateUserHandle={updateUserHandle}
              userAccount={userAccount}
              loading={loading}
              error={error}
              setError={setError}
            />
          </SubCard>
        </Grid2>
        <Grid2 item xs={12} lg={6}>
          <SubCard title="Password Change">
            <PasswordForm
              handleSubmitPassword={handleSubmitPassword}
              loading={loading}
              errorPassword={errorPassword}
              setErrorPassword={setErrorPassword}
            />
          </SubCard>
        </Grid2>
      </Grid2>
      <ErrorSnackbar
        openErrorSnackBar={openErrorSnackBar}
        handleCloseErrorSnackBar={handleCloseErrorSnackBar}
        error={error}
      />
    </MainCard>
  );
};
