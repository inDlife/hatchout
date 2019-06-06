import {InjectConfig} from 'nestjs-config';
import {Injectable} from '@nestjs/common';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';

@Injectable()
export class RepositoryConfigService implements TypeOrmOptionsFactory {
    constructor(@InjectConfig() private config) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const nodeEnv = process.env.NODE_ENV;
        return {
            type: this.config.get(nodeEnv + '.type'),
            host: this.config.get(nodeEnv + '.host'),
            port: this.config.get(nodeEnv + '.port'),
            username: this.config.get(nodeEnv + '.username'),
            password: this.config.get(nodeEnv + '.password'),
            database: this.config.get(nodeEnv + '.database'),
            entities: this.config.get(nodeEnv + '.entities'),
            synchronize: this.config.get(nodeEnv + '.synchronize'),
        };
    }
}
