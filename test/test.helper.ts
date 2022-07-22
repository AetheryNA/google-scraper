import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { AppModule } from 'src/app.module';
import { Users } from 'src/entities/user.entity';
import { HttpExceptionFilter } from 'src/http-exception-filter';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { hash, genSalt } from 'bcrypt';
import { Keywords } from 'src/entities/keywords.entity';

export async function createNestAppInstance(): Promise<INestApplication> {
  let app: INestApplication;

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
    providers: [],
  }).compile();

  // eslint-disable-next-line prefer-const
  app = moduleRef.createNestApplication();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.init();

  return app;
}

export async function createNestAppInstanceWithENVMock(): Promise<{
  app: INestApplication;
  mockConfig: DeepMocked<ConfigService>;
}> {
  let app: INestApplication;

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
    providers: [
      {
        provide: ConfigService,
        useValue: createMock<ConfigService>(),
      },
    ],
  }).compile();

  // eslint-disable-next-line prefer-const
  app = moduleRef.createNestApplication();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.init();

  return { app, mockConfig: moduleRef.get(ConfigService) };
}

export async function clearDB() {
  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name);
    await repository.query(
      `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`,
    );
  }
}

export async function createUser(nestApp, { username, password }: any) {
  let userRepository: Repository<Users>;

  const salt = await genSalt(5);
  const encryptedPassword = await hash(password, salt);

  // eslint-disable-next-line prefer-const
  userRepository = nestApp.get('UsersRepository');

  const user = await userRepository.save(
    userRepository.create({
      username: username,
      password: encryptedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  );

  return user;
}

export async function createKeywordEntry(
  nestApp,
  { userId, randomKeyword }: any,
) {
  let keywordRespository: Repository<Keywords>;

  // eslint-disable-next-line prefer-const
  keywordRespository = nestApp.get('KeywordsRepository');

  const saveKeyword = await keywordRespository.save(
    keywordRespository.create({
      user: userId,
      keyword: randomKeyword,
      total_ads: 1,
      total_links: 1,
      total_search_results: 'About 1 results',
      html_of_page: '<h1>Hello there</h1>',
    }),
  );

  return saveKeyword;
}
