import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '../../repositories/notification-repository';

interface CountRecipientNotificationRequest {
    recipientId: string;
}

interface CountRecipientNotificationResponse {
    count: number;
};

@Injectable()
export class CountRecipientNotifications {

    constructor(
        private notificationRepository: NotificationRepository
    ) { }

    // Metodo para construir a notificação.
    async execute(request: CountRecipientNotificationRequest): Promise<CountRecipientNotificationResponse> {
        const { recipientId } = request;
        
        const count = await this.notificationRepository.countManyByRecipientId(recipientId);
    
        return {
            count
        };
    }
}