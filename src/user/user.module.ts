import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BullModule } from '@nestjs/bull';
import { BULL_BOARD_ADAPTER, BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from "@bull-board/api/bullAdapter";

@Module({
  imports: [
    BullModule.registerQueue({ name: 'imageUpload' }),
    BullBoardModule.forFeature({
      name: 'imageUpload',
      adapter: BullAdapter,
    }),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
