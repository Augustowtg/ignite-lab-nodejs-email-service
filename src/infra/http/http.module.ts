import { CancelNotifications } from '@aplication/use-case/cancel-notifications/cancel-notifications';
import { CountRecipientNotifications } from '@aplication/use-case/count-notifications/count-recipient-notifications';
import { GetRecipientNotifications } from '@aplication/use-case/get-notifications/get-recipient-notifications';
import { ReadNotifications } from '@aplication/use-case/read-notifications/read-notifications';
import { SendNotifications } from '@aplication/use-case/send-notifications/send-notifications';
import { UnreadNotifications } from '@aplication/use-case/unread-notifications/unread-notifications';
import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [
        SendNotifications,
        CancelNotifications,
        CountRecipientNotifications,
        GetRecipientNotifications,
        ReadNotifications,
        UnreadNotifications
    ]
})
export class HttpModule { }
