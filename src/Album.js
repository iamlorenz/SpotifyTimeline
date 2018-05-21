import React from 'react';

export class Album extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="sidebar">
        <div className="header">
          <h1>{this.props.album.name}</h1>
          <h2>{this.props.album.artist.name}</h2>
        </div>
        <div>
          <TrackList tracks={this.props.album.tracks}/>
        </div>
      </div>
    );
  }
}

function TrackList(props) {
  const listItems = props.tracks.map((track, index) =>
    <li key={index}>
      {track.name}
      <button className="add">&#65291;
        <span className="tooltip">Add to 'NOSTALGIA' playlist</span>
      </button>
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
