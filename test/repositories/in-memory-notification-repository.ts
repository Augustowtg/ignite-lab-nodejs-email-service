import { Notification } from "@aplication/entities/notification/notification";
import { NotificationRepository } from "@aplication/repositories/notification-repository";



export class InMemoryNotificationRepository implements NotificationRepository {

    public notifications: Notification[] = [];

    async create(notifications: Notification) {
        this.notifications.push(notifications);
    }

    async findById(notificaitonId: any): Promise<Notification | null> {
        const notificaiton = this.notifications.find(item => item.id == notificaitonId,)

        if (!notificaiton) {
            return null;
        }

        return notificaiton;
    }

    async save(notificaiton: Notification): Promise<void> {
        const notificaitonIndex = this.notifications.findIndex(
            (item) => item.id == notificaiton.id,
        );

        if (notificaitonIndex >= 0) {
            this.notifications[notificaitonIndex] = notificaiton;
        }
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        return this.notifications.filter(
            notification => notification.recipientId == recipientId
        ).length;
    }

    async findManyByRecipient(recipientId: string): Promise<Notification[]> {
        return this.notifications.filter(
            notification => notification.recipientId == recipientId
        );
    }

}