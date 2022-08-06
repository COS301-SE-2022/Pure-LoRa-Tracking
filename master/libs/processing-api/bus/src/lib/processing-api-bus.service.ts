import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ProcessingBus {
    private readonly logger = new Logger(ProcessingBus.name);

   /* @Cron(CronExpression.EVERY_30_SECONDS)
    logCron() {
        this.logger.verbose("CRON RUN")
    }*/
}
