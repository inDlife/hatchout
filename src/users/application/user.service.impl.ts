import {Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user.entity';
import {UserDto} from '../domain/dto/user.dto';
import {UserRepository} from '../infra/userRepository';
import {UserService} from './user.service';
import {DeleteResult} from 'typeorm';
import {ValidateService} from '../domain/validateService';
import * as domain from '../domain/validateService.impl';


@Injectable()
export class UserServiceImpl implements UserService{


    //todo: di interface, not di struct
    constructor(@Inject(domain.ValidateServiceImpl) private validateService: ValidateService,
                @InjectRepository(User) private userRepository: UserRepository) {}

    async get(id: number): Promise<User> {
        return await this.userRepository.findById(id);
    }

    async create(userDto: UserDto): Promise<User> {

        if (!await this.validateService.isAbleToCreate(userDto.address)) {
            throw new Error('unable to create');
        }

        const user = new User(userDto.address);

        let user1 = await this.userRepository.save(user);
        console.log(user1);
        console.log('llll');

        return await this.userRepository.save(user);

    }

    async update(userDto: UserDto): Promise<User> {

        if (!await this.validateService.isAbleToUpdate(userDto.address)) {
            throw new Error('unable to update');
        }

        let user = await this.userRepository.findByAddress(userDto.address);

        return this.userRepository.save(user);
    }


    async delete(id: number):Promise<DeleteResult> {

        return await this.userRepository.delete(id);
    }

}
