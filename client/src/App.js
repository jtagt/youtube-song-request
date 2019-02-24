import React, { Component } from 'react';
import YouTube from 'react-youtube';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: null,
      current: null
    };

    this.nextVideo = this.nextVideo.bind(this);
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      fetch('https://songs.dscrd.app/songs').then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          videos: data
        });
      });
      if (this.state.videos) {
        if (!this.state.current) {
          this.setState({
            current: {id: this.state.videos[0], index: 0}
          });
        };
      };
    }, 1000);
  };

  nextVideo() {
    console.log("Start next song.")
    if (this.state.current.index+1 == this.state.videos.length) {
      this.setState({
        current: {id: null, index: 0}
      });
      this.setState({
        current: {id: this.state.videos[0], index: 0}
      });
    } else {
      this.setState({
        current: {id: this.state.videos[this.state.current.index+1], index: this.state.current.index+1}
      });
    };
  };

  render() {
    const opts = {
      playerVars: {
        autoplay: 1
      }
    };
    
    if (this.state.current) {
      return (
        <YouTube
          videoId={this.state.current.id}
          onEnd={this.nextVideo}
          opts={opts}
          onReady={this._onReady}
        />
      );
    } else {
      return(
        <h1>Loading Queue</h1>
      );
    };
  };
};

export default App;