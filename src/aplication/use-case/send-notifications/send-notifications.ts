import { Content } from '@aplication/entities/notification/content';
import { Notification } from '@aplication/entities/notification/notification';
import { NotificationRepository } from '@aplication/repositories/notification-repository';
import { Injectable } from '@nestjs/common';


interface SendNotificationRequest {
    recipientId: string;
    content: string;
    category: string;
}

interface SendNotificationResponse {
    notification: Notification
}

@Injectable()
export class SendNotifications {
    
    constructor(
        private notificationRepository: NotificationRepository
    ) { }

    // Metodo para construir a notificação.
    async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
        const { recipientId, category, content } = request;

        const notification = new Notification({
            recipientId,
            category,
            content: new Content(content),
        })

        await this.notificationRepository.create(notification);

        return {
            notification
        }
    }
}