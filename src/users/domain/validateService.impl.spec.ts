import {ValidateService} from './validateService';
import {Test, TestingModule} from '@nestjs/testing';
import {ValidateServiceImpl} from './validateService.impl';
import {User} from './user.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import {UserRepository} from '../infra/userRepository';
import {instance, mock, when} from 'ts-mockito';
import {resolve} from 'path';

const mockUser = new User();
mockUser.id = 1;
mockUser.address = 'testAddress';

describe('user.service.impl', () => {

    let service: ValidateService;

    it('should be defined', async () => {

        let mockedRepoisotry:UserRepository = mock(UserRepository);

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ValidateServiceImpl,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockedRepoisotry,
                },
            ],

        }).compile();

        service = module.get<ValidateService>(ValidateServiceImpl);

        expect(service).toBeDefined();
    });

    describe('isAbleToCreate', () => {
        it('should return false', async () => {


            let mockRepository:UserRepository = mock(UserRepository);
            when(mockRepository.findByAddress('address')).thenReturn(new Promise((resolve) => {
                resolve(mockUser);
            }));

            let mockedRepositoryImpl:UserRepository = instance(mockRepository);
            service = new ValidateServiceImpl(mockedRepositoryImpl);
            expect(await service.isAbleToCreate(undefined)).toBeFalsy();
            expect(await service.isAbleToCreate('address')).toBeFalsy();

            when(mockRepository.findByAddress('address')).thenReturn(undefined);
            mockedRepositoryImpl = instance(mockRepository);
            service = new ValidateServiceImpl(mockedRepositoryImpl);
            expect(await service.isAbleToCreate('address')).toBeTruthy();
        });

        it('should return true', async () => {
            let mockRepository:UserRepository = mock(UserRepository);
            when(mockRepository.findByAddress('address')).thenReturn(undefined);
            let mockedRepositoryImpl = instance(mockRepository);
            service = new ValidateServiceImpl(mockedRepositoryImpl);
            expect(await service.isAbleToCreate('address')).toBeTruthy();

        });
    });


    describe('isAbleToUpdate', () => {
        it('should return false', async () => {

            let mockRepository:UserRepository = mock(UserRepository);
            when(mockRepository.findByAddress('address')).thenReturn(undefined);
            let mockedRepositoryImpl:UserRepository = instance(mockRepository);
            service = new ValidateServiceImpl(mockedRepositoryImpl);

            expect(await service.isAbleToUpdate(undefined)).toBeFalsy();
            expect(await service.isAbleToUpdate('address')).toBeFalsy();

        });

        it('should return true', async () => {


            let mockRepository:UserRepository = mock(UserRepository);
            when(mockRepository.findByAddress('address')).thenReturn(new Promise((resolve) => {
                resolve(mockUser);
            }));
            let mockedRepositoryImpl:UserRepository = instance(mockRepository);

            service = new ValidateServiceImpl(mockedRepositoryImpl);

            expect(await service.isAbleToUpdate('address')).toBeTruthy();

        });
    });
});
