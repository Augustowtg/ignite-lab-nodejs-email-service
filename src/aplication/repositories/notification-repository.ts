import { Notification } from "../entities/notification/notification";

export abstract class NotificationRepository {
    abstract create(notification: Notification): Promise<void>;
    abstract findById(notificaitonId): Promise<Notification | null>;
    abstract save(notificaiton: Notification): Promise<void>;
    abstract countManyByRecipientId(recipientId: string): Promise<number>;
    abstract findManyByRecipient(recipientId: string): Promise<Notification[]>;
}