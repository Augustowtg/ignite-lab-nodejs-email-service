import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '../../repositories/notification-repository';
import { NotificationNotFoundError } from '../errors/notification-not-found-error';

interface UnreadNotificationRequest {
    notificaitonId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotifications {

    constructor(
        private notificationRepository: NotificationRepository
    ) { }

    // Metodo para construir a notificação.
    async execute(request: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
        const { notificaitonId } = request;
        
        const notificaiton = await this.notificationRepository.findById(notificaitonId);

        if (!notificaiton) {
            throw new NotificationNotFoundError();
        }


        notificaiton.unread();

        await this.notificationRepository.save(notificaiton);
    }
}