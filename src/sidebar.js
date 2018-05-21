import React from 'react';

export class Sidebar extends React.Component {

}

// LOAD TRACK LIST
function loadTracksforAlbum(props) {
  if (props.item !== null){
    spotifyApi.getAlbum(props.item)
      .then((response) => {

        console.log(response);

        // this.setState({
        //   album: {
        //     name: response.name,
        //     artist: response.artists[0],
        //     tracks: response.tracks.items
        //   }
        // });


      })
  }
}
