package FullStack.InformaColombia.application.service;
import FullStack.InformaColombia.application.dto.response.NotificacionResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

private final SimpMessagingTemplate messagingTemplate;
    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    public NotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendPrivateNotification(String titulo, String username, String message) {
        NotificacionResponse notification = new NotificacionResponse(titulo, username, message);
        try {
            messagingTemplate.convertAndSendToUser(
                    username,
                    "/queue/notifications",
                    notification
            );
            logger.info("✅ Notification sent successfully");
        } catch (Exception e) {
            e.getStackTrace();

        }
    }


    public void sendTopicNotification(NotificacionResponse notification) {
        logger.info("📢 Broadcasting notification to topic");
        messagingTemplate.convertAndSend("/topic/notificaciones", notification);
    }

}
