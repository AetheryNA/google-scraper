import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import { UserModule } from './user.module';
import { LocalStrategy } from 'src/common/strategies/local.strategy';
import { SessionSerializer } from 'src/common/strategies/session.serializer';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
