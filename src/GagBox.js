import React, { Component } from 'react';
import throttle from 'lodash/throttle'
import './GagBox.css';
import axios from 'axios';
import Gag from './Gag';

class GagBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokesList: []
    };

    this._getGag = this._getGag.bind(this);
    this._handleScroll = this._handleScroll.bind(this);

    // this._getGag();
  }

  componentDidMount() {
    this._getGag();
    window.addEventListener('scroll', 
                            throttle((this._handleScroll), 1000, {leading:false,trailing:true}), 
                            false);  
  }

  componentWillUnmount() {
    window.removeListener('scroll', this._handleScroll, false);
  }

  _getGag() {
    const self = this;
    axios.get('http://api.icndb.com/jokes/random/5')
      .then(function(response) {
        const nextJokes = response.data.value;
        self.setState ({
          jokesList: self.state.jokesList.concat(nextJokes)
        });
      });
  }

  _handleScroll = (event) => {
    const gagElement = document.getElementsByClassName('gagComponent')[0];
    console.log('a' + gagElement.clientHeight + ' b' + 
                gagElement.scrollTop + ' c' +
                document.body.scrollHeight + ' length ' + this.state.jokesList.length
                );
    /*if (
      (document.body.clientHeight + gagElement.scrollTop) === document.body.scrollHeight &&
      this.state.jokesList.length
    ) {
      this._getGag();
    }*/

    const windowHeight = "innerHeight" in window ? window.innerHeight : document.gagElement.offsetHeight;
    const body = document.body;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, gagElement.clientHeight,  gagElement.scrollHeight, gagElement.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) { this._getGag(); }
  }

  render() {
    
    return (
      <div className='gagComponent'>
        <h1 className='title'>DadGag</h1>
        <div className='gagListContainer'>
          {this.state.jokesList.map((data, index) => (
            <Gag 
              key={index}
              idx={index}
              joke={data.joke}
              onGag={this._getGag}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default GagBox;
