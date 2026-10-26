import { Injectable } from '@angular/core';
import announcements from '../../content/announcements.json';

export interface Announcement {
  readonly number: number;
  readonly title: string;
  readonly date: string;
  readonly author: string;
  readonly summary: string;
  readonly body: string;
}

/** Bundled at build time: listing and reading announcements never make HTTP requests. */
@Injectable({ providedIn: 'root' })
export class AnnouncementsService {
  private readonly announcements: readonly Announcement[] = [...announcements]
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || b.number - a.number);

  getAll(): readonly Announcement[] { return this.announcements; }
  getById(id: string): Announcement | null {
    if (!/^[1-9]\d*$/.test(id)) return null;
    return this.announcements.find(item => item.number === Number(id)) ?? null;
  }
}
