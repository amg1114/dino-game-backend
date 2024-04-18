import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get(':id')
    findOne(@Param('id') id: number){
        return this.userService.findById(id)
    }

    @Post()
    createUser(@Body() userFields: CreateUserDto){
        return this.userService.createUser(userFields)
    }

    @Patch(':id')
    updateUser(@Param('id') id: number, @Body() userFields: UpdateUserDto){
        return this.userService.updateUser(id, userFields)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number){
        return this.userService.deleteUser(id)
    }
}
