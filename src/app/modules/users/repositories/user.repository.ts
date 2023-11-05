import { CriteriaResult } from '../../shared/interfaces/criteria-result.interface';
import { Nullable } from '../../shared/types/nullable.type';
import { UpdateUserPasswordRequest } from '../dtos/update-user-password-request.dto';
import { UpdateUserRequest } from '../dtos/update-user-request.dto';
import { UserEntity } from '../persistence/user.entity';
import { UserCriteriaQuery } from '../persistence/user-criteria.query';

export interface UserRepository {
	create(user: UserEntity): Promise<UserEntity>;
	delete(id: string): Promise<boolean>;
	findByCriteria(query: UserCriteriaQuery): Promise<CriteriaResult<UserEntity>>;
	findByEmail(email: string): Promise<Nullable<UserEntity>>;
	findById(id: string): Promise<Nullable<UserEntity>>;
	softDelete(id: string): Promise<boolean>;
	update(user: UserEntity, request: UpdateUserRequest): Promise<UserEntity>;
	updatePassword(user: UserEntity, request: UpdateUserPasswordRequest): Promise<UserEntity>;
}
