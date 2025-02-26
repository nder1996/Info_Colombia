import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface Notification {
  titulo: string;
  username: string;
  descripcion: string;
}

class WebSocketService {
  private client: Client | null = null;
  private subscriptions: { [key: string]: any } = {};
  
  connect(username: string, onMessageReceived: (message: Notification) => void): void {
    if (this.client?.active) {
      console.log('🔗 WebSocket already connected');
      return;
    }
    
    // Corregida la URL que tenía https:// duplicado
    const socket = new SockJS("https://info-colombia.onrender.com/ws");
    
    this.client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.log('🐛 Debug:', str)
    });
    
    this.client.onConnect = () => {
      console.log("✅ Connected to WebSocket");
      
      // 👤 Personal notifications
      this.subscriptions[username] = this.client?.subscribe(
        `/user/${username}/queue/notifications`, 
        (message) => {
          console.log('📩 Personal message:', message.body);
          onMessageReceived(JSON.parse(message.body));
        }
      );
      
      // 📢 Topic notifications
      this.client?.subscribe('/topic/notificaciones', (message) => {
        console.log('📢 Topic message:', message.body);
        onMessageReceived(JSON.parse(message.body)); 
      });
    };
    
    this.client.activate();
  }
  
  disconnect(): void {
    Object.values(this.subscriptions).forEach(sub => sub?.unsubscribe());
    this.client?.deactivate();
    this.client = null;
    console.log("❌ WebSocket disconnected");
  }
}

// Crear la instancia primero y luego exportarla (corrige el error de exportación anónima)
const webSocketService = new WebSocketService();
export default webSocketService;