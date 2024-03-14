import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/Auth/auth.service';
import { Usuario } from 'src/entidades/Usuario.entity';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() user: Usuario, @Res() res: Response) {

        const token = await this.authService.createToken(user);

        res.cookie('token', token, { httpOnly: true })
        return res.status(HttpStatus.OK).json({ token });
    }
}