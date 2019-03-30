import { Component, OnInit, ViewChild } from '@angular/core';
import { AlbumsService } from "../../services/albums.service";
import { AlbumEventsService } from "../../services/album-events.service";
import { AlertMessageService } from "../../services/alert-message.service";
import { Album } from "../../interfaces/Album";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-add-album-form',
  templateUrl: './add-album-form.component.html',
  styleUrls: ['./add-album-form.component.css']
})
export class AddAlbumFormComponent implements OnInit {
  album: Album = {
    title: ""
  };
  isEdit = false;

  @ViewChild('addAlbumForm') form: NgForm;
  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService,
    public alertMessageService: AlertMessageService
  ) { }

  ngOnInit() {
    this.albumEvents.albumEditEventObservableSubject.subscribe((data: Album) => {
      if (data.id) {
        this.isEdit = true;
        this.album = Object.assign({}, data);
      }
    });
  }

  onCancel() {
    this.isEdit = false;
    this.form.resetForm();
  }

  onSave() {
    this.albumService.editAlbum(this.album).subscribe((data: Album) => {
      this.albumEvents.emitSaveAlbum(data);
      this.alertMessageService.emitShowAlert({
        message: `Album with id '${data.id}' was changed.`,
        isSuccess: true
      });
      this.form.resetForm();
      this.isEdit = false;
    }, () => {
      this.alertMessageService.emitShowAlert({
        message: "An album with this id does not exist",
        isSuccess: false
      });
    });
  }

  onFormSubmit() {
    const newAlbum = {
      userId: 1,
      title: this.album.title
    };

    this.albumService.addNewAlbum(newAlbum).subscribe((data: Album) => {
      this.albumEvents.emitAddNewAlbum(data);
      this.alertMessageService.emitShowAlert({
        message: `New album '${data.title}' was added.`,
        isSuccess: true
      });
      this.form.resetForm();
    }, () => {
      this.alertMessageService.emitShowAlert({
        message: "Something wrong!",
        isSuccess: false
      });
    });
  }
}
