import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';

// Replace XXXXX with the db password
@Module({
  imports: [ProductModule, MongooseModule.forRoot('mongodb+srv://syadav:<password>@cluster0.e4zjn.mongodb.net/nestjs-demo?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
