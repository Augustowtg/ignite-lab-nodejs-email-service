import { Notification } from '@aplication/entities/notification/notification';
import { makeNotification } from '@test/factories/notification-factory';

import { InMemoryNotificationRepository } from '../../../../test/repositories/in-memory-notification-repository';
import { NotificationNotFoundError } from '../errors/notification-not-found-error';
import { UnreadNotifications } from './unread-notifications';

describe('Unread notification', () => {

    it('should be able to unread a notification', async () => {

        const notificationsRepository = new InMemoryNotificationRepository();
        const unreadNotification = new UnreadNotifications(notificationsRepository);

        const notificaiton = makeNotification({
            readAt: new Date(),
        })

        await notificationsRepository.create(notificaiton);

        await unreadNotification.execute({
            notificaitonId: notificaiton.id,
        });

        // espera que exista uma data no repositorio
        expect(notificationsRepository.notifications[0].readAt).toBeNull();
    });

    it('shoud not be able to read a non existing notification ', async () => {

        const notificationsRepository = new InMemoryNotificationRepository();
        const readNotification = new UnreadNotifications(notificationsRepository);

        expect(() => {
            return readNotification.execute({
                notificaitonId: "fake-notification-id"
            });
        }).rejects.toThrow(NotificationNotFoundError);
    })
});