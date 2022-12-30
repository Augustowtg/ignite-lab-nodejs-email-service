import { Notification } from '@aplication/entities/notification/notification';
import { makeNotification } from '@test/factories/notification-factory';

import { InMemoryNotificationRepository } from '../../../../test/repositories/in-memory-notification-repository';
import { NotificationNotFoundError } from '../errors/notification-not-found-error';
import { ReadNotifications } from './read-notifications';

describe('Read notification', () => {

    it('should be able to read a notification', async () => {

        const notificationsRepository = new InMemoryNotificationRepository();
        const readNotification = new ReadNotifications(notificationsRepository);

        const notificaiton = makeNotification();

        await notificationsRepository.create(notificaiton);

        await readNotification.execute({
            notificaitonId: notificaiton.id,
        });

        // espera que exista uma data no repositorio
        expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));
    });

    it('shoud not be able to read a non existing notification ', async () => {

        const notificationsRepository = new InMemoryNotificationRepository();
        const readNotification = new ReadNotifications(notificationsRepository);

        expect(() => {
            return readNotification.execute({
                notificaitonId: "fake-notification-id"
            });
        }).rejects.toThrow(NotificationNotFoundError);
    })
});