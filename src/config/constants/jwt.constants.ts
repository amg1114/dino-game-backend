import { ConfigModule, ConfigService } from "@nestjs/config"

ConfigModule.forRoot();
const configService = new ConfigService();

export const jwtConstants = {
    secret: configService.get<string>('JWT_SECRET') || 'secret'
}