import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseApp } from "./firebase-config";
import { setDocData } from "./firebase-firestore";
import { currentUser } from "./firebase-auth";

const messaging = getMessaging(firebaseApp);

// Saving the messaging device token to Cloud Firestore.
const saveMessagingDeviceToken = async () => {
  try {
    const currentToken = await getToken(messaging);
    if (currentToken) {
      console.log("Got FCM  device token.");
      // set doc
      // Saving the Device Token to Cloud Firestore.

      setDocData("fcmTokens", currentToken, { uid: currentUser.uid });
      onMessage(messaging, (message) => {
        // notification payload
        console.log(
          "New foreground notification from Firebase Messaging!",
          message.notification
        );
      });
    } else {
      await requestNotificationPermissions();
    }
  } catch (error) {
    throw error;
  }
};

const requestNotificationPermissions = async () => {
  console.log("Requesting notifications permission...");
  const permission = await Notification.requestPermission();
  if (permission) {
    console.log("Notification permission granted.");
    await saveMessagingDeviceToken();
  } else {
    console.log("Unable to get permission to notify.");
  }
};
