import React from 'react';
import{Link} from 'framework7-react';

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
        {(this.props.pseudo ? 
        <Link panelOpen="right" onClick={this.clickHandler}>
          <div
            className="pin bounce"
            style={{backgroundColor: this.props.color, cursor: 'pointer' }}
            title={this.props.pseudo}
          >
          </div>
          <div className="pulse"/>
        </Link> :
        <Link panelOpen="left">
          <div
            className="pin bounce"
            style={{backgroundColor: this.props.color, cursor: 'pointer' }}
            title={this.props.pseudo}
          >
          </div>
          <div className="pulse"/>
        </Link>
        )}
        
      </div>
    );
  }
  
};
