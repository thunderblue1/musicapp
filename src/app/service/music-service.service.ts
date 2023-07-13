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

//Make the service injectable in root
@Injectable({ providedIn: 'root' })

//This section contains properties and functions that can be imported
export class MusicServiceService {

  //Store albums from json file into an array
  albums: Album[] = exampledata;

  //Method for returning artists in an Artist array
  public getArtists(): Artist[] {
    //Create an array to store artists in
    let artists: Artist[] = [];

    //Create a set so that an artist can only be added once
    let artistSet = new Set<string>();

    //Iterate over every album and only put unique artist names into the set
    this.albums.forEach(a => artistSet.add(a.artist));

    //Add every unique artist name to the artists array
    artistSet.forEach(a => artists.push({artist: a}))

    //Send back the array of artists containing unique artist names
    return artists;
  }

  //Method for returning albums in an Album array
  public getAlbums(): Album[] {
    //Send back the array containing all of the albums
    return this.albums;
  }

  //Method for returning Albums in an Album array for a particular artist.
  public getAlbumsOfArtist(artistName: String): Album[] {
    //Create an array for the albums of the artist to be stored in
    let albums: Album[] = [];

    //Cycle through all of the albums
    this.albums.forEach(album => {
      //Determine if the album is by the chosen artist
      if (album.artist == artistName) {
        //Add the album to the array if it is by the chosen artist
        albums.push(album);
      }
    });

    //Send back the array containing albums by the chosen artist
    return albums;
  }

  //Method for creating an album
  public createAlbum(album: Album): number {
    //Add the album to the albums array
    this.albums.push(album);

    //Return okay
    return 0;
  }

  //Method for updating an album
  public updateAlbum(album: Album): number {
    //Iterate through all of the albums
    for (let i = 0; i < this.albums.length; ++i) {
      //Execute this block of code if the album id matches the album we are updating
      if (this.albums[i].albumId == album.albumId) {
        //Splice the parameter album into the array
        //where the old album used to exist
        this.albums.splice(i, 1, album);
        //Return okay
        return 0;
      }
    }
    //Return failure
    return -1;
  }

  //Method for deleting an album
  public deleteAlbum(id: number): number {
    //Iterate through all of the albums
    for (let i = 0; i < this.albums.length; ++i) {
      //Execute this block of code if the parameter id matches the album id
      if (this.albums[i].albumId == id) {
        //Splice out the album that matches in id
        this.albums.splice(i, 1);
        //Return okay
        return 0;
      }
    }
    //Return failure
    return -1;
  }
}
