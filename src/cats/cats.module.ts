import { Module, Global } from '@nestjs/common';
import { CatsController, CatssController } from './cats.controller';
import { CatsService } from './cats.service';

// To make the CatsService available to other modules, export it from the CatsModule.
// The CatsService is now available to other modules that import the CatsModule.
// The CatsModule is now a global module.
@Global() // This decorator makes the CatsModule global, which makes the CatsService available to other modules. but it is not recommended to use it.
@Module({
  controllers: [CatsController, CatssController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}