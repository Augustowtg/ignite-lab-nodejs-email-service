import { Content } from "@aplication/entities/notification/content";
import { Notification, NotificationProps } from "@aplication/entities/notification/notification";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
    return new Notification({
        category: "social",
        content: new Content("Nova socitação de amizade!"),
        recipientId: 'recipient-1',
        ...override,
    });
}