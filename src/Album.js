import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
const description = 'Automatic created by spotifytimeline.com';
const playlistName = 'RE-LISTEN';

export class Album extends React.Component {

  constructor(props){
    super(props);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.state = {
      playlistId: localStorage.getItem('playlistId')
    }
  }

  addToPlaylist(track) {
    if (this.state.playlistId === null){
      //create playlist
      spotifyApi.createPlaylist(this.props.user.id, {name: playlistName, description: description, public: false})
        .then((response) => {

          //set playlist to the the playlist we just created
          this.setState({ playlistId: response.id });
          //save it to local storage
          localStorage.setItem('playlistId', response.id);
          //add the track to the playlist
          this.addTracksToPlaylist(response.id, track)

        })
    } else {
        this.addTracksToPlaylist(this.state.playlistId, track);
    }
  }

  addTracksToPlaylist(playlistId, track) {
    spotifyApi.addTracksToPlaylist(this.props.user.id, playlistId, [track])
      .then((response) => {
        console.log(response);
      })
      //do something here to catch errors
  }


  render() {
    console.log(this.props);
    return (
      <div className="sidebar">
        <div className="header">
          <h1>{this.props.album.name}</h1>
          <h2>{this.props.album.artist.name}</h2>
        </div>
        <div>
          <TrackList tracks={this.props.album.tracks} addToPlaylist={this.addToPlaylist}/>
        </div>
      </div>
    );
  }
}

function TrackList(props) {
  const listItems = props.tracks.map((track, index) =>
    <li key={index}>
      {track.name}
      <button className="add" onClick={() => props.addToPlaylist(track.uri)}>&#65291;
        <span className="tooltip">Add to <b>{ playlistName }</b> playlist</span>
      </button>
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
