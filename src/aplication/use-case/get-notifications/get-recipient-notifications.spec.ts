import { Notification } from '@aplication/entities/notification/notification';
import { makeNotification } from '@test/factories/notification-factory';

import { InMemoryNotificationRepository } from '../../../../test/repositories/in-memory-notification-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';


describe('Get recipients notifications', () => {

    it('should be able to get recipients notifications', async () => {

        const notificationsRepository = new InMemoryNotificationRepository();
        const getRecipientNotification = new GetRecipientNotifications(notificationsRepository);

        await notificationsRepository.create(makeNotification({ recipientId: "recipient-1" }));
        await notificationsRepository.create(makeNotification({ recipientId: "recipient-1" }));
        await notificationsRepository.create(makeNotification({ recipientId: "recipient-2" }));

        const { notifications } = await getRecipientNotification.execute({
            recipientId: 'recipient-1',
        });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({ recipientId: 'recipient-1' }),
            expect.objectContaining({ recipientId: 'recipient-1' }),
        ]))
    });
});