import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Artist } from '../models/artists.model';
import { MusicServiceService } from '../service/music-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-list-artists',
  templateUrl: './list-artists.component.html',
  styleUrls: ['./list-artists.component.css']
})
export class ListArtistsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: MusicServiceService,private router:Router) {
  }
  selectedArtist: Artist|null=null;
  artists: Artist[] = [];
  ngOnInit() {
    console.log("Getting data ....");
    this.service.getArtists((artists: Artist[])=>{
      this.artists = artists;
      console.log('this.artists',this.artists);
    });
  }
  onSelectArtist(artist: Artist) {
    this.selectedArtist = artist;
  }

}
