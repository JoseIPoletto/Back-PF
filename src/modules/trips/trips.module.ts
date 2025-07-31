import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trip } from "./trip.entity";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";
import { Provider } from "../providers/Entities/provider.entity";
import { ProviderPicture } from "../providers/Entities/provider-pictures.entity";
import { Product } from "@/products/entities/product.entity";
import { User } from "../users/user.entity";
import { ProductPicture } from "@/products/entities/product-pictures.entity";
// src/trips/trips.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { Trip } from './trip.entity';
import { Provider } from '../providers/Entities/provider.entity';
import { ProviderPicture } from '../providers/Entities/provider-pictures.entity';
import { User } from '../users/user.entity';
import { Product } from '../../products/entities/product.entity';
import { NotificationsModule } from '../notifications/notifications.module'; // Importar módulo de notificaciones

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip, Provider, ProviderPicture, User, Product]),
    NotificationsModule, // Importar para usar el gateway
  ],
  controllers: [TripsController],
  providers: [TripsService],
  exports: [TripsService],
})
export class TripsModule {}