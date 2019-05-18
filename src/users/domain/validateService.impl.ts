import {ValidateService} from './validateService';
import {Injectable} from '@nestjs/common';
import {User} from './user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {IUserRepository, UserRepository} from '../infra/userRepository';

@Injectable()
export class ValidateServiceImpl implements ValidateService {

    constructor(@InjectRepository(User) private usersRepository: UserRepository) {}

    async isAbleToCreate(address: string): Promise<boolean> {
        if (address == undefined) {
            return false;
        }

        let user = await this.usersRepository.findByAddress(address);
        return user == undefined;
    }


    async isAbleToUpdate(address: string): Promise<boolean> {
        if (address == undefined) {
            return false;
        }

        let user = await this.usersRepository.findByAddress(address);
        return user != undefined;
    }

}
