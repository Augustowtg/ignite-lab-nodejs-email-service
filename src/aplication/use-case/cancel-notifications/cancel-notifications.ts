import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '../../repositories/notification-repository';
import { NotificationNotFoundError } from '../errors/notification-not-found-error';

interface CancelNotificationRequest {
    notificaitonId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotifications {

    constructor(
        private notificationRepository: NotificationRepository
    ) { }

    // Metodo para construir a notificação.
    async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse> {
        const { notificaitonId } = request;
        
        const notificaiton = await this.notificationRepository.findById(notificaitonId);

        if (!notificaiton) {
            throw new NotificationNotFoundError();
        }


        notificaiton.cancel();

        await this.notificationRepository.save(notificaiton);
    }
}