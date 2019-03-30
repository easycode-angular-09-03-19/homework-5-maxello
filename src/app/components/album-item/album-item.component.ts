import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../interfaces/Album';
import { AlbumsService } from '../../services/albums.service';
import { AlbumEventsService } from "../../services/album-events.service";
import { AlertMessageService } from "../../services/alert-message.service";

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent implements OnInit {
  @Input() item: Album;
  constructor(
    private albumsService: AlbumsService, 
    private albumEvents: AlbumEventsService,
    private alertMessageService: AlertMessageService
  ) { }

  onDeleteAlbum() {
    confirm("Are you sure?") ? this.albumsService.deleteAlbum(this.item.id).subscribe((data: Album) => {
      //there is no id in the data
      this.albumEvents.emitDeleteAlbum(this.item.id);
      this.alertMessageService.emitShowAlert({
        message: `The album with id '${this.item.id}' was deleted.`,
        isSuccess: true
      });
    }) : null;
  }

  onEditAlbum() {
    this.albumEvents.emitEditAlbum(this.item);
  }

  ngOnInit() { }
}
