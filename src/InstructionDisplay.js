import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';


class InstructionDisplay extends Component {

  render() {
    return (
      <div id="instruction-display" style={{marginBottom:'20px',paddingBottom:'20px',borderBottom:'1px solid #ccc'}}>
        <Typography variant="h5" color="inherit" style={{flexGrow:1}}>
          Instructions
        </Typography>
      
        <Typography variant="body2" color="inherit" style={{flexGrow:1}}>
          Using the editor on the left, define your machine configuration. Find the&nbsp;
          <Link href={"https://docs.cloudseam.app/specs/version-1-0/"}>
            machine spec here
          </Link>.
          <br />
          <strong>Did you know?</strong> You can drag-and-drop a YAML file on the editor to start from an existing machine definition!
        </Typography>
        
      </div>
    );
  }
}

export default InstructionDisplay;
