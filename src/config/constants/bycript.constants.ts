import { ConfigModule, ConfigService } from "@nestjs/config";

ConfigModule.forRoot();
const configService = new ConfigService();

export const SALT_ROUNDS = configService.get<number>('SALT_ROUNDS') || 10;