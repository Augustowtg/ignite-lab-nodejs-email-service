import { Notification } from '@aplication/entities/notification/notification';
import { NotificationRepository } from '@aplication/repositories/notification-repository';
import { Injectable } from '@nestjs/common';


interface GetNotificationRequest {
    recipientId: string;
}

interface GetNotificationResponse {
    notifications: Notification[]
}

@Injectable()
export class GetRecipientNotifications {
    
    constructor(
        private notificationRepository: NotificationRepository
    ) { }

    // Metodo para construir a notificação.
    async execute(request: GetNotificationRequest): Promise<GetNotificationResponse> {
        const { recipientId } = request;

        const notifications = await this.notificationRepository.findManyByRecipient(recipientId);

        return {
            notifications
        }
    }
}