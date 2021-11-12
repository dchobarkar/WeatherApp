import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

// Function to send push notification if it's going to rain
async function sendPushNotification(title: string, des: string) {
  // To receive notification while the app is running in foreground
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

  if (status != "granted") {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  }

  if (status != "granted") {
    alert("Failed to get the push notification.");
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync();

  fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: token.data,
      sound: "default",
      title: title,
      body: des,
    }),
  });
}

export default sendPushNotification;
