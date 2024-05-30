import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/user.module'; // Import your modules here
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   // TypeORM configuration options
    //   // Example: database connection settings
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'password',
    //   database: 'nestjs_db',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    UsersModule,
    AuthModule, // Add your modules here
  ],
  //   controllers: [UsersController], // Add your controllers here
  //   providers: [AppService], // Add your services here
})
export class AppModule {}
