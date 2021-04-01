import { INestApplication } from '@nestjs/common';
import { FileDto } from '../dto/File';

const mockS3Object = jest.fn();
jest.mock('aws-sdk', () => {
      return {
            config: {
                  update: jest.fn(),
            },
            S3: jest.fn(() => ({ putObject: mockS3Object })),
      };
});

//* Internal import
import { initTestModule } from '../../../../test/initTest';
import { AwsService } from '../aws.service';
import { Buffer } from 'buffer';
describe('TokenService', () => {
      let app: INestApplication;
      let awsService: AwsService;
      beforeAll(async () => {
            const { getApp, module } = await initTestModule();
            app = getApp;
            awsService = module.get<AwsService>(AwsService);
      });

      describe('checkFileExtension', () => {
            let file: FileDto;

            beforeEach(() => {
                  file = {
                        buffer: Buffer.from('ok'),
                        originalname: 'hello.png',
                        fieldname: 'file',
                        encoding: '7bit',
                        mimetype: 'image/jpeg',
                        size: 593518,
                  };
            });

            it('Pass', () => {
                  const isCorrect = awsService.checkFileExtension(file);

                  expect(isCorrect).toBeTruthy();
            });

            it('Pass with extension', () => {
                  file.originalname = 'test.txt';
                  const isCorrect = awsService.checkFileExtension(file, ['.txt']);

                  expect(isCorrect).toBeTruthy();
            });

            it('Failed', () => {
                  file.originalname = 'test.txt';
                  const isCorrect = awsService.checkFileExtension(file);

                  expect(isCorrect).toBeFalsy();
            });
            it('Failed no file', () => {
                  file.originalname = 'test';
                  const isCorrect = awsService.checkFileExtension(file);

                  expect(isCorrect).toBeFalsy();
            });
      });
      describe('checkFileSize', () => {
            let file: FileDto;

            beforeEach(() => {
                  file = {
                        buffer: Buffer.from('ok'),
                        originalname: 'hello.png',
                        fieldname: 'file',
                        encoding: '7bit',
                        mimetype: 'image/jpeg',
                        size: 593518,
                  };
            });

            it('Pass', () => {
                  const isCorrect = awsService.checkFileSize(file, 1);

                  expect(isCorrect).toBeTruthy();
            });

            it('Failed', () => {
                  const isCorrect = awsService.checkFileSize(file, 0.5);

                  expect(isCorrect).toBeFalsy();
            });
      });

      describe('uploadFile', () => {
            let file: FileDto;

            beforeEach(() => {
                  file = {
                        buffer: Buffer.from('ok'),
                        originalname: 'hello.png',
                        fieldname: 'file',
                        encoding: '7bit',
                        mimetype: 'image/jpeg',
                        size: 593518,
                  };
            });

            it('Pass', async () => {
                  mockS3Object.mockImplementation(() => {
                        return {
                              promise() {
                                    return Promise.resolve();
                              },
                        };
                  });
                  const fileName = await awsService.uploadFile(file, '123', 'user');
                  expect(fileName).toBeDefined();
                  expect(fileName).toContain('.png');
            });
            it('Failed', async () => {
                  mockS3Object.mockImplementation(() => {
                        return {
                              promise() {
                                    return Promise.reject();
                              },
                        };
                  });
                  const fileName = await awsService.uploadFile(file, '123', 'user');

                  expect(fileName).toBeNull();
            });
      });

      afterAll(async (done) => {
            await app.close();
            done();
      });
});
