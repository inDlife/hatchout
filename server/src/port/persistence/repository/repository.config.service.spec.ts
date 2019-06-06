import {Test, TestingModule} from '@nestjs/testing';
import {ConfigModule} from 'nestjs-config';
import * as path from 'path';
import {RepositoryConfigService} from './repository.config.service';

describe('RepositoryConfig', () => {
    let configService: RepositoryConfigService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.load(path.resolve(__dirname + '/test', 'config', '**/!(*.d).{ts,js}')),
            ],
            providers: [
                RepositoryConfigService,
            ],
        }).compile();

        configService = module.get<RepositoryConfigService>(RepositoryConfigService);
    });

    describe('#createTypeOrmOptions()', () => {
        it('should return option', () => {
            const options = configService.createTypeOrmOptions();
            expect(options.type).toBe('postgres');
            expect(options.database).toBe('test');
            expect(options.entities[0]).toBe('src/domain/*/*.entity.ts');
        });

    });
});
