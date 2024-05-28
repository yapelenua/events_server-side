import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto/task.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getEvents() {
    return this.eventsService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createEvent(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateEvent(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventsService.update(id, dto);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.eventsService.getById(id);
  }

  @Get(':id/recommends')
  async getRecommendedEvents(@Param('id') id: string) {
    return this.eventsService.getRecommended(id);
  }
}
