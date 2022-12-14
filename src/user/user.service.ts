import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = {
      ...createUserDto,
      password: hashSync(createUserDto.password, 10),
    };

    const createdUser = this.repository.create(user);
    await this.repository.save(createdUser);
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });

    if (!user) throw new NotFoundException('Usuário nao encontrado');

    return {
      ...user,
    };
  }
}
