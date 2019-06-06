import { Module } from '@nestjs/common';
import {UserServiceImpl} from '../../app/user/user.service.impl';
import {UserRepository} from '../persistence/repository/user.repository.impl';
import {UserController} from '../../web/user/user.controller';
import {DatabaseModule} from './database.module';

@Module({
    controllers: [UserController],
    imports: [
        DatabaseModule,
    ],
    providers: [
        {provide: 'UserService', useClass: UserServiceImpl},
        {
            provide: 'IUserRepository',
            useClass: UserRepository,
        },
    ],
})
export class UserModule {

}
