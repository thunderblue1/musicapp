import { Component } from '@angular/core';
import { Track } from '../models/tracks.model';
import { MusicServiceService } from '../service/music-service.service';
import { Album } from '../models/albums.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.css']
})
export class EditAlbumComponent {

  album: Album = {
    albumId: Math.floor(Math.random() * 1000000),
    title: "",
    artist: "",
    description: "",
    year: "",
    image: "",
    tracks: []
  };

  tracksRaw: string = "";
  wasSubmitted: boolean = false;
  id: string | null=null;
  constructor(private service: MusicServiceService,private route: ActivatedRoute) { }
  gotten:Album[] | undefined;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    let aId:string = this.id!;
    this.service.getAlbum(aId,(albums: Album[])=>{
      console.log('Getting album '+this.id);
      this.gotten = albums;
      this.album = this.gotten[0];
      for(let i=0;i<this.album.tracks.length;i++) {
        this.tracksRaw+=this.album.tracks[i].title+"\n";
      }
    });
  }

  public onSubmit() {

    let tracks: Track[] = [];
    let tracksAll = this.tracksRaw.split('\n');
    for (let i = 0; i < tracksAll.length; ++i) {
      let title = "";
      let lyrics = "";
      let video = "";
      let trackInfo = tracksAll[i];
      let trackParts = trackInfo.split(':');
      if (trackParts.length == 3) {
        title = trackParts[0];
        lyrics = trackParts[1];
        video = trackParts[2];
      }
      else if (trackParts.length == 2) {
        title = trackParts[0];
        lyrics = trackParts[1];
      }
      else {
        title = trackParts[0];
      }
      tracks.push(
        { trackId: Math.floor(Math.random() * 1000000), number: i + 1, title, lyrics, video }
      );
    }
    this.album.tracks = tracks;
    console.log(this.album);
    let status = this.service.updateAlbum(this.album,()=>{console.log("Attempt at updating album: "+this.album.title)});
    console.log("The return from createAlbum() was " + status);
    this.wasSubmitted = true;
  }
}

