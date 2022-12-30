import { makeNotification } from '@test/factories/notification-factory';

import { InMemoryNotificationRepository } from '../../../../test/repositories/in-memory-notification-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';


describe('Count recipients notifications', () => {

    it('should be able to count recipients notifications', async () => {

        const notificationsRepository = new InMemoryNotificationRepository();
        const countRecipientNotification = new CountRecipientNotifications(notificationsRepository);

        await notificationsRepository.create(makeNotification({recipientId: "recipient-1"}));
        await notificationsRepository.create(makeNotification({recipientId: "recipient-1"}));
        await notificationsRepository.create(makeNotification({recipientId: "recipient-2"}));

        const { count } = await countRecipientNotification.execute({
            recipientId: 'recipient-1',
        });

        expect(count).toEqual(2);
    });
});