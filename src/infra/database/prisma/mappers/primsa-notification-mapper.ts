import { Notification as RawNotificaiton } from '@prisma/client';
import { Notification } from "@aplication/entities/notification/notification";
import { Content } from '@aplication/entities/notification/content';

export class PrismaNotificationMappper {
    static toPrisma(notification: Notification) {
        return {
            id: notification.id,
            category: notification.category,
            content: notification.content.value,
            recipientId: notification.recipientId,
            readAt: notification.readAt,
            createdAt: notification.createdAt
        }
    }

    static toDomain(raw: RawNotificaiton): Notification {
        return new Notification({
            category: raw.category,
            content: new Content(raw.content),
            recipientId: raw.recipientId,
            readAt: raw.readAt,
            canceledAt: raw.canceledAt,
            createdAt: raw.createdAt,
        }, raw.id)
    }
}