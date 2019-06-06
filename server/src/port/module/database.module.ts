import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RepositoryConfigService} from '../persistence/repository/repository.config.service';
import {UserRepository} from '../persistence/repository/user.repository.impl';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: RepositoryConfigService,
        }),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    providers: [RepositoryConfigService],
    exports: [RepositoryConfigService],
})
export class DatabaseModule {}
