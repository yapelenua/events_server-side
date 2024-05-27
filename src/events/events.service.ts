import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto, UpdateEventDto } from './dto/task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id: +id
      }
    });

    if (!event) throw new NotFoundException('Event Not Found!');
    
    return event;
  }

  getAll() {
    return this.prisma.event.findMany();
  }

  create(dto: CreateEventDto) {
    return this.prisma.event.create({
      data: dto
    });
  }

  async update(id: string, dto: UpdateEventDto) {
    const event = await this.getById(id);

    return this.prisma.event.update({
      where: {
        id: event.id
      },
      data: {
        description: dto.description,
        title: dto.title,
        location: dto.location,
        date: dto.date
      }
    });
  }

  async delete(id: string) {
    const event = await this.getById(id);

    return this.prisma.event.delete({
      where: {
        id: event.id
      }
    });
  }

  async getRecommended(id: string) {
    const event = await this.getById(id);

    const recommendedEvents = await this.prisma.event.findMany({
      where: {
        OR: [
          { location: event.location },
          { date: event.date },
          { category: event.category }
        ],
        NOT: {
          id: event.id
        }
      }
    });

    return recommendedEvents;
  }
}
