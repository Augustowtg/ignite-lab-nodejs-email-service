import { InMemoryNotificationRepository } from '../../../../test/repositories/in-memory-notification-repository';

import { SendNotifications } from './send-notifications';

describe('Send notification', () => {

    it('should be able to send a notification', async () => {

        const notificationsRepository = new InMemoryNotificationRepository();

        const sendNotification = new SendNotifications(notificationsRepository);

        const { notification } = await sendNotification.execute({
            content: 'This is a notification',
            category: 'social',
            recipientId: 'example-recipient-id'
        });

        expect(notificationsRepository.notifications).toHaveLength(1);
        expect(notificationsRepository.notifications[0]).toEqual(notification);
    });
});