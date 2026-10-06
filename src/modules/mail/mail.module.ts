import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import * as path from 'node:path'
import { EMAIL_QUEUE, EMAIL_SERVICE } from '../../consts.js'
import { MailConsumer } from './mail.consumer.js'
import { MailService } from './mail.service.js'

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      defaults: {
        from: '"Curso NestJS" <no-reply@filippe.dev>',
      },
      template: {
        dir: path.join(import.meta.dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ClientsModule.register([
      {
        name: EMAIL_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL!],
          queue: EMAIL_QUEUE,
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  providers: [MailService],
  exports: [MailService, ClientsModule],
  controllers: [MailConsumer],
})
export class MailModule {}
