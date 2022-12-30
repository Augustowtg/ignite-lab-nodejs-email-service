import { Injectable } from '@nestjs/common';
import { Notification } from 'src/aplication/entities/notification/notification';

import { NotificationRepository } from '../../../../aplication/repositories/notification-repository';
import { PrismaNotificationMappper } from '../mappers/primsa-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {

    constructor(private prisma: PrismaService) { }

    async create(notification: Notification): Promise<void> {
        const rawNotificaiton = PrismaNotificationMappper.toPrisma(notification);

        await this.prisma.notification.create({ data: rawNotificaiton })
    }

    async save(notificaiton: Notification): Promise<void> {
        const raw = PrismaNotificationMappper.toPrisma(notificaiton);

        await this.prisma.notification.update({
            where: {
                id: raw.id,
            },
            data: raw,
        });
    }

    // Find by id
    async findById(notificaitonId: any): Promise<Notification | null> {
        const rawNotification = await this.prisma.notification.findUnique({
            where: {
                id: notificaitonId,
            }
        });
        
        if(!rawNotification) {
            return null;
        }

        return PrismaNotificationMappper.toDomain(rawNotification);
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = await this.prisma.notification.count({
            where: {
                recipientId,
            }
        });
         
        return count;
    }

    async findManyByRecipient(recipientId: string): Promise<Notification[]> {
        const notificaitons = await this.prisma.notification.findMany({
            where: {
                recipientId,
            }
        })

        return notificaitons.map(PrismaNotificationMappper.toDomain);
    }

}