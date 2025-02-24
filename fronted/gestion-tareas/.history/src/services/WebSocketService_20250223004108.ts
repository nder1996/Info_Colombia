import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { AuthService } from "./AuthService";


interface Notification {
    titulo: string;
    username: string;
    message: string;
  }

  class WebSocketService {
    private client: Client | null = null;
    private subscriptions: { [key: string]: any } = {};
   
    connect(username: string, onMessageReceived: (message: Notification) => void): void {
      if (this.client?.active) return;
  
      const socket = new SockJS("http://localhost:8700/ws");
  
      this.client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          if (!this.client) return;
  
          // Topic notifications
          this.client.subscribe('/topic/notificaciones', (message) => {
            try {
              const notification = JSON.parse(message.body);
              onMessageReceived(notification);
            } catch (error) {
              console.error('Error parsing message:', error);
            }
          });
  
          // Personal notifications
          this.subscriptions[username] = this.client.subscribe(
            `/user/${username}/queue/notifications`,
            (message) => {
              try {
                const notification = JSON.parse(message.body);
                onMessageReceived(notification);
              } catch (error) {
                console.error('Error parsing message:', error);
              }
            }
          );
        }
      });
  
      this.client.activate();
    }
   
    disconnect(): void {
      Object.values(this.subscriptions).forEach(sub => sub?.unsubscribe());
      this.client?.deactivate();
      this.client = null;
      console.log("❌ WebSocket disconnected");
    }
   }
   
   export default new WebSocketService();