import { Controller, Get, Req, Redirect, 
  Post, Body, Header, Param, HttpException,
  HttpStatus, ParseIntPipe, UsePipes, ValidationPipe,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import e, { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { ErrorsInterceptor } from 'src/common/interceptors/errors.interceptor';
import { CacheInterceptor } from 'src/common/interceptors/cache.interceptor';

@Controller('cat')
export class CatssController {
    @Get("hey/:id")
    /* @Redirect('https://nestjs.com', 301) */
    findOne(@Param('id') id: string) {
        console.log(`This action returns a cat with id: ${id}`);
    }
    /* The following line will not run */
    findAll(@Req() request: Request): string {
        /*     console.log(request.headers); 
            console.log(request.body);
            console.log(request.params);
            console.log(request.query);
            console.log(request.url);
            console.log(request.method);
            console.log(request.path);
            console.log(request.hostname);
            console.log(request.ip);
            console.log(request.protocol);
            console.log(request.secure);
            console.log(request.subdomains);
            console.log(request.xhr); */

        return 'This action returns all cats';
    }
}

@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ErrorsInterceptor)
@UseInterceptors(CacheInterceptor)
@Controller('cats')
@UseGuards(RolesGuard) // Apply RolesGuard globally to this controller
export class CatsController {
    constructor(private catsService: CatsService) { }

    /* @UsePipes(ValidationPipe) */
    @Post()
    /* @Roles('admin')  */ // Only 'admin' role can access this route
    @Header('Cache-Control', 'none')
    async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
        return `This action adds a new cat ${createCatDto.name}`;
    }

    @Get()
    /* @Roles('user', 'admin')  */ // 'user' and 'admin' roles can access this route
    async findAll(): Promise<Cat[]> {
      return this.catsService.findAll();
    }

    @Get(':id')
/*     async findOne(@Param('id', ParseIntPipe) id: string): Promise<Cat> { */
      async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string): Promise<Cat> {
      return this.catsService.findOne(+id);

/*       const cats = this.catsService.findAll();
      if (cats.length <= +id) {
        throw new HttpException('Not Found', 
          HttpStatus.NOT_FOUND
        );
      } else {
        return cats[id];
      } */
    }
}



/* @Controller('cats')
export class CatsController {
    @Post()
    @Header('Cache-Control', 'none')
    async create(@Body() createCatDto: CreateCatDto) {
        console.log(createCatDto);
        return `This action adds something a new cat ${createCatDto.name}`;
    }
} */


/* 
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
 */
