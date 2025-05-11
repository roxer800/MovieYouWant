import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const notificationFunction = async (title: string, message: string) => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      sound: 'default',
    });
  }
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: message,
      sound: 'default',
      subtitle: 'Movie You Want',
      sticky: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      vibrate: [0, 250, 250, 250], 
      color:"#7950f2",

    },
    trigger: null, 
  });
};
