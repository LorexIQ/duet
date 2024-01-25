import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {UsersModule} from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        ScheduleModule.forRoot(),
        UsersModule,
        //AuthModule
    ],
    controllers: [
        AppController
    ]
})
export class AppModule {
}
