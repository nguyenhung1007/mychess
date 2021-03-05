import * as supertest from 'supertest';
import { INestApplication } from '@nestjs/common';

//* Internal import
import { fakeUser } from '../../../test/fakeEntity';
import { UserRepository } from '../../user/entities/user.repository';
import { initTestModule } from '../../../test/initTest';
import { UserController } from '../user.controller';
import { ChangePasswordDTO } from '../dto/changePassword.dto';
import { AuthService } from '../../auth/auth.service';
import { RedisService } from '../../utils/redis/redis.service';
import User from '../entities/user.entity';

describe('UserController', () => {
      let app: INestApplication;
      let userRepository: UserRepository;
      let userController: UserController;
      let authService: AuthService;
      let redisService: RedisService;
      let cookieData: Array<string>;
      beforeAll(async () => {
            const { getApp, module, cookie } = await initTestModule();
            app = getApp;
            userRepository = module.get<UserRepository>(UserRepository);
            authService = module.get<AuthService>(AuthService);
            redisService = module.get<RedisService>(RedisService);
            userController = module.get<UserController>(UserController);
            cookieData = cookie;
      });

      describe('Put /api/user/reset-password/:otp', () => {
            let user: User;
            let redisKey: string;
            let body: ChangePasswordDTO;
            const reqApi = (body, redisKey) => supertest(app.getHttpServer()).put(`/api/user/reset-password/${redisKey}`).send(body);

            beforeAll(async () => {
                  user = fakeUser();
                  user.email = 'heaty566@gmail.com';
                  await authService.saveUser(user);
                  redisKey = await authService.createOTPRedisKey(user, 2);
                  body = {
                        newPassword: 'Password123',
                        confirmNewPassword: 'Password123',
                  };
            });

            it('Pass', async () => {
                  const beforeRedisKey = await redisService.getObjectByKey(redisKey);
                  const res = await reqApi(body, redisKey);
                  const getUser = await userRepository.findOneByField('_id', user._id);
                  const isMatch = await authService.comparePassword(body.newPassword, getUser.password);
                  const afterRedisKey = await redisService.getObjectByKey(redisKey);
                  expect(res.status).toBe(200);
                  expect(beforeRedisKey).toBeDefined();
                  expect(afterRedisKey).toBeNull();
                  expect(isMatch).toBeTruthy();
            });

            it('Failed redis key is used', async () => {
                  const res = await reqApi(body, redisKey);

                  expect(res.status).toBe(403);
            });
            it('Failed redis expired', async () => {
                  const res = await reqApi(body, 123456);

                  expect(res.status).toBe(403);
            });
      });

      describe('GET /', () => {
            const reqApi = () => supertest(app.getHttpServer()).get('/api/user/').set({ cookie: cookieData }).send();

            it('Pass', async () => {
                  const res = await reqApi();
                  expect(res.body.data).toBeDefined();
            });
      });

      afterAll(async () => {
            await userRepository.clear();
            await app.close();
      });
});
