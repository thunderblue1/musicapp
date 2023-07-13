import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artists.model';
import { MusicServiceService } from '../service/music-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-artists',
  templateUrl: './list-artists.component.html',
  styleUrls: ['./list-artists.component.css']
})
export class ListArtistsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: MusicServiceService) {
  }
  selectedArtist: Artist|null=null;
  artists: Artist[] = [];
  ngOnInit() {
    this.route.queryParams.subscribe(params=> {
      console.log("Getting data ...");
      this.artists = this.service.getArtists();
      this.selectedArtist = null;
    });
  }
  onSelectArtist(artist: Artist) {
    this.selectedArtist = artist;
  }
}
