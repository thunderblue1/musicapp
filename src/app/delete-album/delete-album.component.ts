import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-album',
  templateUrl: './delete-album.component.html',
  styleUrls: ['./delete-album.component.css']
})
export class DeleteAlbumComponent {
  artist:string|null=null;
  albumId: string|null=null;
  constructor(private route:ActivatedRoute) {

  }
  ngOnInit() {
    this.artist = this.route.snapshot.paramMap.get("artist");
    this.albumId = this.route.snapshot.paramMap.get("id");
  }
}
