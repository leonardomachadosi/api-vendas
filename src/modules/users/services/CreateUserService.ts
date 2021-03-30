import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    avatar,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const userExistis = await userRepository.findByEmail(email);

    if (userExistis) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
