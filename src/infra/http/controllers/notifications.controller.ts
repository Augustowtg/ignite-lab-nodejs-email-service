import { CancelNotifications } from '@aplication/use-case/cancel-notifications/cancel-notifications';
import { CountRecipientNotifications } from '@aplication/use-case/count-notifications/count-recipient-notifications';
import { GetRecipientNotifications } from '@aplication/use-case/get-notifications/get-recipient-notifications';
import { ReadNotifications } from '@aplication/use-case/read-notifications/read-notifications';
import { SendNotifications } from '@aplication/use-case/send-notifications/send-notifications';
import { UnreadNotifications } from '@aplication/use-case/unread-notifications/unread-notifications';
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';

import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotifications: SendNotifications,
    private cancelNotifications: CancelNotifications,
    private readNotifications: ReadNotifications,
    private unreadNotifications: UnreadNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) { }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotifications.execute({
      notificaitonId: id
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotifications.execute({
      notificaitonId: id
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotifications.execute({
      notificaitonId: id
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    }
  }


  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP), 
    }
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotifications.execute({
      recipientId,
      category,
      content,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
} 