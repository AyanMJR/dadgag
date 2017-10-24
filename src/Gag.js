import React, { Component } from 'react';
import './Gag.css';

class Gag extends Component {
  
  render() {
    const boxcolor = ['#af7ac5', '#7bcf44', '#2dbbd2', '#f39c12', '#ec7063'];
    let border = {
      borderColor : boxcolor[(this.props.idx)%boxcolor.length]
    }
    return (
        <div className='gagContainer' style={border}>
            <p className='gagContent'>{this.props.joke}</p>
        </div>
      );
  }
}

export default Gag;