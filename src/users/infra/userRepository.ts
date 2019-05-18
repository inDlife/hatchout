import {EntityRepository, FindOneOptions, ObjectID, Repository} from 'typeorm';
import {User} from '../domain/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IUserRepository{

    findById(id: number) {
        return this.findOne({ id });
    }

    findByAddress(address: string) {
        return this.findOne({address});
    }
}


export interface IUserRepository {
    findOne( id?: string | number | Date | ObjectID, options?: FindOneOptions<User>): Promise<User | undefined>;
    save(entity: User): Promise<User>;
}
