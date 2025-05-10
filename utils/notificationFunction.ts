import * as Notifications from 'expo-notifications';

export const notificationFunction = async (title: string, message: string) => {
    
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: message,
      sound: 'default',
    },
    trigger: null, 
  });
};
