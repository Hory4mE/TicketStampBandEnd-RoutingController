import "reflect-metadata";
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  HttpError,
} from "routing-controllers";

import { TicketServices } from "./TicketServices";
import { Container } from "typedi";
import { ITicket } from "@app/data/abstraction/entities/ITicket";
import _ from "lodash";
import { CreateTicketStatusRequest, UpdateTicketStatusRequest, bodyUpdateRequest } from "./dto/TicketRequest";

@Controller()
export class TicketController {
  serviceInstance = Container.get(TicketServices);

  @Get("/")
  async welcomeMessage() {
    return "Welcome";
  }

  @Get("/tickets")
  async fetchAllTickets() {
    try {
      const services = await this.serviceInstance.fetchAllTickets();
      return services;
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.httpCode, error.message);
      } else {
        throw new HttpError(500, "Internal Server Error");
      }
    }
  }

  @Get("/tickets/:id")
  async findTicketById(@Param("id") id: string) {
    try {
      const services = await this.serviceInstance.findTicketById(id);
      return services;
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.httpCode, error.message);
      } else {
        throw new HttpError(500, "Internal Server Error");
      }
    }
  }

  @Post("/tickets")
  async createTicket(@Body() user: CreateTicketStatusRequest) {
    try {
      await this.serviceInstance.createTicket(user);
      return { msg: "successfully crates" };
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.httpCode, error.message);
      } else {
        throw new HttpError(500, "Internal Server Error");
      }
    }
  }

  @Put("/tickets/status/:id")
  async updateTicketStatus(@Param("id") id: string, @Body() user: UpdateTicketStatusRequest) {
    try {
      const pickedTicket = _.pickBy(user, (row) => !!row);
      await this.serviceInstance.updateStatusById(id, pickedTicket);
      return { msg: "successfully update Status" };
    } catch (error) {
      console.error(error.message + " AKSDKASKD");
      if (error instanceof HttpError) {
        throw new HttpError(error.httpCode, error.message);
      } else {
        throw new HttpError(500, "Internal Server Error");
      }
    }
  }

  @Put("/tickets/:id")
  async updateTicketData(@Param("id") id: string, @Body() user: bodyUpdateRequest) {
    try {
      const pickedTicket = _.pickBy(user, (row) => !!row);
      await this.serviceInstance.updateTicketById(id, pickedTicket);
      return { msg: "successfully update Data" };
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.httpCode, error.message);
      } else {
        throw new HttpError(500, "Internal Server Error");
      }
    }
  }

  @Delete("/tickets/:id")
  async removeTicket(@Param("id") id: string) {
    try {
      await this.serviceInstance.deleteTicket(id);
      return { msg: "successfully delete" };
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.httpCode, error.message);
      } else {
        throw new HttpError(500, "Internal Server Error");
      }
    }
  }
}
