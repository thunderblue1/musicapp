/*
*The code in this file was provided by GCU.
*The previous comments were deleted and custom comments were
*added to demonstrate the students code comprehension.
*/

//This import is created by default
//Import injectable so that the service can be injected
import { Injectable } from '@angular/core';

//Import data from the json file
import exampledata from '../../data/sample-music-data.json';

//Import the models that will be used
import { Artist } from './../models/artists.model';
import { Album } from '../models/albums.model';
import { HttpClient } from '@angular/common/http';

//Make the service injectable in root
@Injectable({ providedIn: 'root' })

//This section contains properties and functions that can be imported
export class MusicServiceService {
  private host = "http://localhost:5000";

  //Store albums from json file into an array
  albums: Album[] = exampledata;

  constructor(private http: HttpClient){}

  //Method for returning artists in an Artist array
  public getArtists(callback:(artists:Artist[])=>void): void {
    this.http.get<Artist[]>(this.host+"/artists").subscribe(
      (artist:Artist[]) => {
        console.log(artist);
        callback(artist);
      }
    );
  }

  //Method for returning albums in an Album array
  public getAlbums(callback: (album: Album[]) => void): void {
    this.http.get<Album[]>(this.host+"/albums").subscribe(
      (albums: Album[])=> {
        callback(albums);
      }
    );
  }

  //Method for returning Albums in an Album array for a particular artist.
  public getAlbumsOfArtist(artistName: String, callback: (albums: Album[])=>void): void {
    let request = this.host+`/albums/${artistName}`;
    console.log('request',request);
    this.http.get<Album[]>(request).subscribe(
      (albums:Album[]) => {
        console.log('have albums',albums);
        callback(albums);
      }
    );
  }

  //Method for creating an album
  public createAlbum(album: Album,callback: ()=>void): void {
    //Add the album
    this.http.post<Album>(this.host+"/albums",album).subscribe(
      (data)=>{
        callback();
      }
    );
  }

  //Method for updating an album
  public updateAlbum(album: Album, callback: ()=>void): void {
    this.http.put<Album>(this.host+"/albums",album).subscribe(
      (data) => {
        callback();
      }
    );
  }

  //Method for deleting an album
  public deleteAlbum(id: number, callback: ()=>void): void {
    this.http.delete(this.host+"/albums/"+id).subscribe(
      (data) => {
        callback();
      }
    );
  }

  //Method for getting a specific album
  public getAlbum(id:string,callback: (albums: Album[])=>void):void {
    this.http.get<Album[]>(this.host+"/albums?albumId="+id).subscribe(
      (albums: Album[]) => {
        callback(albums);
      }
    );
  }

}
