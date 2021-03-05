import { RedisClient } from 'redis';
import { Injectable, Inject } from '@nestjs/common';
import * as flat from 'flat';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class RedisService {
      constructor(@Inject('RedisClient') private readonly redisRepository: RedisClient, private readonly logger: LoggerService) {}

      setObjectByKey(key: string, value: Record<string, any>, expired?: number) {
            const flatValue: Record<string, any> = flat(value);
            this.redisRepository.hmset(key, flatValue);
            if (expired) {
                  this.redisRepository.expire(key, expired * 60);
            }
      }

      deleteByKey(key: string) {
            this.redisRepository.del(key);
      }

      getObjectByKey<T>(key: string) {
            return new Promise<T>((res, rej) => {
                  this.redisRepository.hgetall(key, (err, data) => {
                        if (err) {
                              this.logger.print(err, 'error');
                              return rej(null);
                        }

                        res(flat.unflatten(data) as T);
                  });
            });
      }

      // how many minutes to expired
      setByValue(key: string, value: number | string, expired?: number) {
            if (expired) {
                  this.redisRepository.setex(key, expired * 60, String(value));
            } else {
                  this.redisRepository.set(key, String(value));
            }
      }

      // *todo take a note if it goes wrong
      getByKey(key: string): Promise<string> {
            return new Promise((res, rej) => {
                  this.redisRepository.get(key, (err, data) => {
                        if (err) {
                              this.logger.print(err, 'error');
                              return rej(null);
                        }

                        res(data);
                  });
            });
      }
}
