import { Component, Input, OnInit } from '@angular/core';
import { Artist } from '../models/artists.model';
import { MusicServiceService } from '../service/music-service.service';
import { Album } from '../models/albums.model';

@Component({
  selector: 'app-list-albums',
  templateUrl: './list-albums.component.html',
  styleUrls: ['./list-albums.component.css']
})
export class ListAlbumsComponent implements OnInit {
  constructor(private service: MusicServiceService) {}
  ngOnInit(): void {
    this.albums = this.service.getAlbumsOfArtist(this.artist!.artist);
  }
  @Input() artist: Artist | null = null;
  albums: Album[]=[];
  selectedAlbum: Album | null = null
  public onSelectAlbum(album: Album){
    this.selectedAlbum = album;
  }
}
