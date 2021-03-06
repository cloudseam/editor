import React, { Component } from 'react';
import Editor from './editor/Editor';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './App.css';
import InstructionDisplay from './InstructionDisplay';
import MachineInfoDisplay from './machineInfo/MachineInfoDisplay';
import SplitPane from 'react-split-pane';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#138fc2',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      "Poppins",
      "sans-serif",
    ]
  },
});

class App extends Component {
  state = {
    machineJson: null
  };

  onMachineChange = (machineJson) => {
    this.setState({ machineJson })
  };

  render() {
    const { machineJson } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" style={{flexGrow:1}}>
              CloudSeam Machine Editor
            </Typography>
            <Button color="inherit" href="https://docs.cloudseam.app/">Docs</Button>
            <Button color="inherit" href="https://github.com/cloudseam/editor">GitHub</Button>
          </Toolbar>
        </AppBar>

        <div id="main-content">
          <SplitPane 
            split="vertical"
            defaultSize={500}
            id="main-content"
          >
            <Editor onMachineChange={this.onMachineChange} />
            <div style={{ padding: '15px' }}>
              <InstructionDisplay />
              <MachineInfoDisplay machineJson={machineJson} />
            </div>
          </SplitPane>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
