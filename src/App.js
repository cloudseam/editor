import React, { Component } from 'react';
import Editor from './editor/Editor';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import MachineInfoDisplay from './machineInfo/MachineInfoDisplay';
import SplitPane from 'react-split-pane';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    useNextVariants: true,
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
            <Typography variant="h6" color="inherit">
              Cloudseam Machine Editor
            </Typography>
          </Toolbar>
        </AppBar>

        <div>
          <SplitPane 
            split="vertical"
            defaultSize={500}
            id="main-content"
          >
            <Editor onMachineChange={this.onMachineChange} />
            <MachineInfoDisplay machineJson={machineJson} />
          </SplitPane>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
