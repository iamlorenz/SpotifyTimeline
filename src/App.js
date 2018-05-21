import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Timeline from 'react-visjs-timeline';
import './App.css';
import Options from './options';
const spotifyApi = new SpotifyWebApi();

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
      profile: { name: '' },
      albums: [{start: "2017-12-18T20:44:02Z", content: "" }]
    }
  }

  componentDidMount() {
    this.getSavedAlbums();
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
          profile: {
            name: response.display_name
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

  render() {
    return (
      <div className="App">

        { this.state.loggedIn &&
          <button onClick={() => this.getSavedAlbums()}>Albums</button>
        }

        <Timeline
          options={Options}
          items={this.state.albums}
        />

        <div className="sidebar">
        </div>

      </div>
    );
  }
}

export default App;
