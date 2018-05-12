import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Timeline from 'react-visjs-timeline';
const spotifyApi = new SpotifyWebApi();
const albums = [];

const tlOptions = {
  width: '100%',
  height: '260px',
  stack: false,
  showMajorLabels: true,
  showCurrentTime: true,
  type: 'background',
  format: {
    minorLabels: {
      minute: 'h:mma',
      hour: 'ha'
    }
  }
}

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
      this.getUser();
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: ''},
      profile: { name: '' }
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
        });
      })
  }

  getUser() {
    spotifyApi.getMe()
      .then((response) => {
        this.setState({
          profile: {
            name: response.display_name
          }
        });
      })
  }

  getSavedAlbums() {
    spotifyApi.getMySavedAlbums({limit: 50})
      .then((response) => {
        for (let i = 0; i < response.items.length; i++) {
          console.log(response.items[i]);
          const album = {
            start: response.items[i].added_at,
            end: response.items[i].added_at,
            content: response.items[i].album.name
          }
          albums.push(album);
        }
        console.log(albums);

      })
  }


  render() {
    return (
      <div className="App">
        { this.state.loggedIn &&
          <button onClick={() => this.getSavedAlbums()}>
            Get My Albums
          </button>
        }

        <Timeline
          options={tlOptions}
          items={albums}
        />

      </div>
    );
  }
}

export default App;
