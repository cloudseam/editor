import React, { Component, Fragment } from 'react';
import Editor from './editor/Editor';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './App.css';
import GraphDisplay from './GraphDisplay';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
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

        <Grid container spacing={24} id="main-content">
          <Grid item xs={12} sm={4}>
            <Editor onMachineChange={this.onMachineChange} />
          </Grid>
          <Grid item xs={12} sm={8} id="right-content">
            <GraphDisplay machineJson={machineJson} />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
