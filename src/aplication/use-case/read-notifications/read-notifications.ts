import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '../../repositories/notification-repository';
import { NotificationNotFoundError } from '../errors/notification-not-found-error';

interface ReadNotificationRequest {
    notificaitonId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotifications {

    constructor(
        private notificationRepository: NotificationRepository
    ) { }

    // Metodo para construir a notificação.
    async execute(request: ReadNotificationRequest): Promise<ReadNotificationResponse> {
        const { notificaitonId } = request;
        
        const notificaiton = await this.notificationRepository.findById(notificaitonId);

        if (!notificaiton) {
            throw new NotificationNotFoundError();
        }


        notificaiton.read();

        await this.notificationRepository.save(notificaiton);
    }
}