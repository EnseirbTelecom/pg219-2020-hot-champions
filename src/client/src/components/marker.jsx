import React from 'react';
import{Link} from 'framework7-react';
import image from '../public/presentation.png'
export default class Marker extends React.Component{
  constructor(props){
    super(props);
    this.user = {
      pseudo: "",
      color: "",
    };
  }
  render(){
    return (
      <div>
        <Link panelOpen="right">
          <div
            className="pin bounce"
            style={{backgroundColor: this.user.color, cursor: 'pointer' }}
            title={this.user.pseudo}
          />
          <div className="pulse" />
        </Link>
      </div>
    );
  }
  
};
