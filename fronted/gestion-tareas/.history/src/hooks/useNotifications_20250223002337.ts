import { useEffect, useState } from "react";
import WebSocketService from "src/services/WebSocketService";


interface Notification {
    titulo: string; 
    username: string;
    message: string;
   }

   export const useNotifications = (username: string) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
   
    useEffect(() => {
      if (!username) return;
      
      const handleNotification = (notification: Notification) => {
        console.log('📨 Notification received:', notification);
        setNotifications(prev => [...prev, notification]);
      };
   
      WebSocketService.connect(username, handleNotification);
      return () => WebSocketService.disconnect();
    }, [username]);
   
    return notifications;
   };