import {User} from '../domain/user.entity';
import {UserDto} from '../domain/dto/user.dto';
import {UserService} from './user.service';
import {UserServiceImpl} from './user.service.impl';
import {ValidateServiceImpl} from '../domain/validateService.impl';
import {IUserRepository, UserRepository} from '../infra/userRepository';
import {instance, mock, when} from 'ts-mockito';

//given
const mockUser = new User();
mockUser.id = 1;
mockUser.address = 'testAddress';

const mockUserUpdated = new User();
mockUserUpdated.id = 1;
mockUserUpdated.address = 'testAddressUpdated';

describe('UserService', async () => {

  let service: UserService;

  beforeAll(async () => {

    let mockedRepoisotry:UserRepository = mock(UserRepository);


  const validateService = new ValidateServiceImpl(mockedRepoisotry);
  service = new UserServiceImpl(validateService,mockedRepoisotry);
  });



  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be saved', async () => {
    //given

    const newUserDto = new UserDto();
    newUserDto.address = 'testAddress';
    const user = new User(newUserDto.address);

    let mockRepository:UserRepository = mock(UserRepository);
    when(mockRepository.findById(1)).thenReturn(new Promise((resolve) => {
        resolve(mockUser)}
      ));
    when(mockRepository.save(user)).thenReturn(new Promise((resolve) => {
      resolve(mockUser)}
      ));

    let mockedRepositoryImpl:UserRepository = instance(mockRepository);

    const validateService = new ValidateServiceImpl(mockedRepositoryImpl);
    service = new UserServiceImpl(validateService,mockRepository);


    //when
    const createdUser = await service.create(newUserDto);

    //then
    expect(createdUser.address).toBe(newUserDto.address);

    //when
    const retrievedUser = await service.get(1);

    //then
    expect(retrievedUser.address).toBe(createdUser.address);

  });

  it('should not be saved', async () => {

    //given
    let mockRepository:UserRepository = mock(UserRepository);
    when(mockRepository.findByAddress('testAddress')).thenReturn(new Promise((resolve) => {
      resolve(mockUser)}));

    let mockedRepositoryImpl:UserRepository = instance(mockRepository);
    const validateService = new ValidateServiceImpl(mockedRepositoryImpl);
    service = new UserServiceImpl(validateService,mockRepository);

    const newUserDto = new UserDto();

    // when & then
    await expect(service.create(newUserDto))
        .rejects
        .toThrowError('unable to create');

    //given
    newUserDto.address = 'testAddress';

    //when & then
    await expect(service.create(newUserDto))
        .rejects
        .toThrowError('unable to create')

  });

  it('shoud be updated', async () => {

    //given
    const newUserDto = new UserDto();
    newUserDto.address = 'testAddressUpdated';

    let mockRepository:UserRepository = mock(UserRepository);
    when(mockRepository.findById(1)).thenReturn(new Promise((resolve) => {
      resolve(mockUserUpdated)}));
    when(mockRepository.findByAddress('testAddressUpdated')).thenReturn(new Promise((resolve) => {
      resolve(mockUser)}));
      when(mockRepository.save(newUserDto)).thenReturn(new Promise((resolve) => {
        resolve(mockUserUpdated)}));
        let mockedRepositoryImpl: UserRepository = instance(mockRepository);

        const validateService = new ValidateServiceImpl(mockedRepositoryImpl);
        service = new UserServiceImpl(validateService, mockRepository);

        //when
        const updatedUser = await service.update(newUserDto);

        //then
        expect(updatedUser.address).toBe(newUserDto.address);

        //when
        const retrievedUser = await service.get(1);

        //then
        expect(retrievedUser.address).toBe(updatedUser.address);

      });

      it('should not be updated', async () => {

        //given

        let mockRepository: UserRepository = mock(UserRepository);
        when(mockRepository.findByAddress('testAddress')).thenReturn(new Promise((resolve) => {
          resolve(undefined)}));
          let mockedRepositoryImpl: UserRepository = instance(mockRepository);

          const validateService = new ValidateServiceImpl(mockedRepositoryImpl);
          service = new UserServiceImpl(validateService, mockedRepositoryImpl);

          const newUserDto = new UserDto();

          //when & then
          await expect(service.update(newUserDto))
              .rejects
              .toThrowError('unable to update');

          //given
          newUserDto.address = 'testAddress';

          //when & then
          await expect(service.update(newUserDto))
              .rejects
              .toThrowError('unable to update')
        });

        it('should not get', async () => {
          //when & then
          expect(await service.get(null)).toBeNull()

        });

        it('should delete', async () => {
          //given
          let mockRepository: UserRepository = mock(UserRepository);
          when(mockRepository.findById(1)).thenReturn(new Promise((resolve) => {
            resolve(undefined)}));
            let mockedRepositoryImpl: UserRepository = instance(mockRepository);

            const validateService = new ValidateServiceImpl(mockedRepositoryImpl);
            service = new UserServiceImpl(validateService, mockRepository);
            expect(await service.delete(1)).toBeUndefined();
          });

          it('should not delete', async () => {

            let mockRepository: UserRepository = mock(UserRepository);
            when(mockRepository.findById(1)).thenReturn(undefined);
            let mockedRepositoryImpl: UserRepository = instance(mockRepository);
            const validateService = new ValidateServiceImpl(mockedRepositoryImpl);
            service = new UserServiceImpl(validateService, mockedRepositoryImpl);

            //when & then
            expect(await service.delete(null)).toBeUndefined();

            //when & then
            expect(await service.delete(1)).toBeUndefined();
          });

        });


