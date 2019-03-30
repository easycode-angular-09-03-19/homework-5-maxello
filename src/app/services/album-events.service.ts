import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Album } from "../interfaces/Album";

@Injectable({
  providedIn: 'root'
})
export class AlbumEventsService {
  private albumAddEventSource = new BehaviorSubject({});
  public  albumAddEventObservableSubject = this.albumAddEventSource.asObservable();

  private albumDeleteEventSource = new BehaviorSubject(0);
  public  albumDeleteEventObservableSubject = this.albumDeleteEventSource.asObservable();

  private albumEditEventSource = new BehaviorSubject({});
  public  albumEditEventObservableSubject = this.albumEditEventSource.asObservable();

  private albumSaveEventSource = new BehaviorSubject({});
  public  albumSaveEventObservableSubject = this.albumSaveEventSource.asObservable();

  constructor() {}

  emitAddNewAlbum(value: Album) {
    this.albumAddEventSource.next(value);
  }

  emitDeleteAlbum(data: number) {
    this.albumDeleteEventSource.next(data);
  }

  emitEditAlbum(value: Album) {
    this.albumEditEventSource.next(value);
  }

  emitSaveAlbum(value: Album) {
    this.albumSaveEventSource.next(value);
  }
}
