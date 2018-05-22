import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Timeline from 'react-visjs-timeline';
import './App.css';
import { Album } from './Album';
import Options from './options';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(props){
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
      this.getUser();
    }
    this.state = {
      loggedIn: token ? true : false,
      user: {},
      albums: [{start: "2017-12-18T20:44:02Z", content: "" }],
      album: {},
      playlist: null,
      showSidebar: false
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

  getUser() {
    spotifyApi.getMe()
      .then((response) => {
        this.setState({
          user: {
            name: response.display_name,
            id: response.id
          }
        });
      })
  }

  getSavedAlbums() {
    spotifyApi.getMySavedAlbums({limit: 50})
      .then((response) => {

        let userAlbums = [];

        for (let i = 0; i < response.items.length; i++) {
          const albumArt = response.items[i].album.images[0].url;
          const album = {
            id: response.items[i].album.id,
            start: response.items[i].added_at,
            content: "<img style='width: 100px; height: 100px;' src='"+albumArt+"'/>",
            title: "<b>"+response.items[i].album.artists[0].name + "</b><br>" + response.items[i].album.name
          }
          userAlbums.push(album);
        }
        this.setState({
          albums: userAlbums
        });

      })
  }

  displayAlbum(props) {
    if (props.item !== null){
      spotifyApi.getAlbum(props.item)
        .then((response) => {

          this.setState({
            album: {
              name: response.name,
              artist: response.artists[0],
              tracks: response.tracks.items
            },
            showSidebar: true
          });

        })
    } else {
      //hide sidebar if not tapping on an album
      this.setState({ showSidebar: false });
    }
  }

  render() {
    return (
      <div className="App">

        { this.state.loggedIn &&
          <button className="load" onClick={() => this.getSavedAlbums()}>Refresh</button>
        }

        <Timeline
          options={Options}
          items={this.state.albums}
          clickHandler={(props) => this.displayAlbum(props)}
        />

        { this.state.showSidebar &&
          <Album
            album={this.state.album}
            user={this.state.user}
          />
        }

      </div>
    );
  }
}

export default App;
