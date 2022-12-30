import { Notification } from '@aplication/entities/notification/notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';

import { NotificationNotFoundError } from '../errors/notification-not-found-error';
import { CancelNotifications } from './cancel-notifications';


describe('Cancel notification', () => {

    it('should be able to cancel a notification', async () => {

        const notificationsRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotifications(notificationsRepository);

        const notificaiton = new Notification(makeNotification());

        await notificationsRepository.create(notificaiton);

        await cancelNotification.execute({
            notificaitonId: notificaiton.id,
        });

        // espera que exista uma data no repositorio
        expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    });

    it('shoud not be able to cancel a non existing notification ', async () => {

        const notificationsRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotifications(notificationsRepository);

        expect(() => {
            return cancelNotification.execute({
                notificaitonId: "fake-notification-id"
            });
        }).rejects.toThrow(NotificationNotFoundError);
    })
});