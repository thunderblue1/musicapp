import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    console.log('Getting albums ....');
    this.service.getAlbumsOfArtist(this.artist.artist, (albums: Album[])=>{
      this.albums = albums;
    });
  }
  @Input() artist!: Artist;
  albums: Album[]=[];
  selectedAlbum: Album | null = null
  public onSelectAlbum(album: Album){
    this.selectedAlbum = album;
  }

}
