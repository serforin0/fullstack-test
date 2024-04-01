import { Module } from '@nestjs/common';
import axios from 'axios';

@Module({
  providers: [
    {
      provide: 'AxiosInstance',
      useValue: axios.create({
        baseURL: 'https://libretranslate.com',
      }),
    },
  ],
  exports: ['AxiosInstance'], // Exporta el proveedor para que esté disponible en otros módulos
})
export class AxiosModule {}