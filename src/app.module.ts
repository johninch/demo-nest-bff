import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './server/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-demo'), // forRoot() method accepts the same configuration object as mongoose.connect(): https://mongoosejs.com/docs/connections.html
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
