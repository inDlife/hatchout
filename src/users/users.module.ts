import { Module } from '@nestjs/common';
import {User} from './domain/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserServiceImpl} from './application/user.service.impl';
import {ValidateService} from './domain/validateService';

import * as api from './application/user.service.impl';
import * as domain from './domain/validateService.impl';

@Module({
    imports: [

        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'rootpassword',
            database: 'hatchout_server',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),

        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        api.UserServiceImpl,
        domain.ValidateServiceImpl,
    ],
})
export class UsersModule {}
