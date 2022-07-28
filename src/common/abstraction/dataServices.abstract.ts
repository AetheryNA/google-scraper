import { Keywords } from 'src/entities/keywords.entity';
import { Users } from 'src/entities/user.entity';
import { IGenericRepository } from './generic.abstract';

export abstract class IDataServices {
  abstract keywords: IGenericRepository<Keywords>;

  abstract users: IGenericRepository<Users>;
}
