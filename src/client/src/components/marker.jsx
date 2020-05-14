import React from 'react';
import{Link} from 'framework7-react';
import Avatar from '@material-ui/core/Avatar';
import image from '../public/presentation.png'
export default class Marker extends React.Component{
  constructor(props){
    super(props);
  }

  clickHandler = () =>{
    localStorage.setItem("friendClicked",this.props.pseudo);
  }

  render(){
    return (
      <div>
        <Link panelOpen="right" onClick={this.clickHandler}>
          <div
            className="pin bounce"
            style={{backgroundColor: this.props.color, cursor: 'pointer' }}
            title={this.props.pseudo}
          >
          </div>
          <div className="pulse"/>
        </Link>
      </div>
    );
  }
  
};
