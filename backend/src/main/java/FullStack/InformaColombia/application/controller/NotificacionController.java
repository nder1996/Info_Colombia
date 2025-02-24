package FullStack.InformaColombia.application.controller;

import FullStack.InformaColombia.application.dto.response.NotificacionResponse;
import FullStack.InformaColombia.application.service.NotificationService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class NotificacionController {

   /* private final NotificationService notificationService;

    public NotificacionController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @MessageMapping("/tarea")
    public void handleNotification(NotificacionResponse notificacion) {
        // Send to specific user
        notificationService.sendPrivateNotification(
                notificacion.getUsername(),
                notificacion
        );

        // Broadcast to topic
        notificationService.sendTopicNotification(notificacion);
    }*/
}
