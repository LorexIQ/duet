import {Injectable, OnModuleInit} from "@nestjs/common";
import {PrismaClient} from "@prisma/client";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor(private configService: ConfigService) {
        const username = configService.get('POSTGRES_USER', 'USERNAME');
        const password = configService.get('POSTGRES_PASSWORD', 'PASSWORD');
        const url = configService.get('POSTGRES_URL', 'URL');
        const port = configService.get('POSTGRES_PORT', 'PORT');
        const db = configService.get('POSTGRES_DB', 'DB');

        super({
            datasourceUrl: `postgresql://${username}:${password}@${url}:${port}/${db}?schema=public`
        });
    }
    async onModuleInit() {
        await this.$connect();
    }
}
