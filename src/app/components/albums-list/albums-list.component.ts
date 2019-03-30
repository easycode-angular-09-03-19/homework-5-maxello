import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { Album } from "../../interfaces/Album";
import { AlbumEventsService } from "../../services/album-events.service";

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {
  albums: Album[];

  constructor(
    public albumsService: AlbumsService,
    public albumEvents: AlbumEventsService
  ) { }

  ngOnInit() {
    this.albumsService.getAlbums().subscribe((data: Album[]) => {
      this.albums = data;
    });

    this.albumEvents.albumAddEventObservableSubject.subscribe((data: Album) => {
      if (data.title) {
        this.albums.unshift(data);
      }
    });

    this.albumEvents.albumDeleteEventObservableSubject.subscribe((id: number) => {
      if (id) {
        this.albums = this.albums.filter((item: Album) => {
          return item.id !== id; 
        });
      }
    });

    this.albumEvents.albumSaveEventObservableSubject.subscribe((data: Album) => {
      if (data.id) {
        this.albums.forEach((item: Album) => {
          if(item.id === data.id){
            item.title = data.title;
          }
        });
      }
    });
  }
}
