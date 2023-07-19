import { Component, Input } from '@angular/core';
import { Album } from '../models/albums.model';
import { faEdit, faTrash, faList } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-album',
  templateUrl: './display-album.component.html',
  styleUrls: ['./display-album.component.css']
})
export class DisplayAlbumComponent {
  constructor(private http: HttpClient,private router: Router) {
  }
  @Input() album!: Album;
  faEdit = faEdit;
  faTrash = faTrash;
  faList= faList;
  url:string="";
  response: Observable<Object> | undefined;

  public onDelete(albumId: number) {
    this.url = "http://localhost:5000/albums/"+albumId;
    this.response = this.http.delete(this.url);
    console.log("Deleting: "+this.url);
    this.response.subscribe(
      (data) => {
        console.log(data);
      }
    );
    this.router.navigate(['/delete/'+this.album.artist+'/'+this.album.albumId]);
  }
}
