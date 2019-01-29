import React, { Component } from 'react';
import PropTypes from 'prop-types';
import machineToSmcat from './machineToSmcat';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import './GraphDisplay.css';

class GraphDisplay extends Component {
  state = {
    smCatConfig : null,
    direction : 'Left-Right',
    anchorEl: null,
  };

  static getDerivedStateFromProps(props, state) {
    state.smCatConfig = machineToSmcat(props.machineJson);
    if (state.smCatConfig) {
      state.svg = window.smcat.render(
        state.smCatConfig,
        { 
            inputType: 'json', 
            direction: state.direction.toLowerCase(),
        }
      );
    }
    return state;
  }

  componentDidMount() {
    const canvas = this.refs.graph;
    window.canvg(canvas, this.state.svg);
  }

  componentDidUpdate() {
      const canvas = this.refs.graph;
      window.canvg(canvas, this.state.svg);
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (direction) => {
    if (!direction) direction = this.state.direction;
    this.setState({ anchorEl: null, direction });
  };

  download = () => {
    var link = document.createElement('a');
    link.download = 'state-chart.png';
    link.href = this.refs.graph.toDataURL();
    link.click();
  };

  render() {
    const { svg, anchorEl, direction } = this.state;

    return (
        <div id='graph-display'>
            
            <Typography variant="h5" color="inherit">
              State Machine Graph
              { svg && <Button variant="contained" color="primary" style={{marginLeft:"20px"}} onClick={this.download}>Download</Button> }
            </Typography>

            Direction: 
            <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
            >
                { direction }
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => this.handleClose()}
            >
                <MenuItem onClick={() => this.handleClose('Left-Right')}>Left-Right</MenuItem>
                <MenuItem onClick={() => this.handleClose('Top-Down')}>Top-Down</MenuItem>
            </Menu>

            { svg && <canvas ref="graph" width="1200" />}
        </div>
    );
  }
}

GraphDisplay.propTypes = {
    machineJson : PropTypes.object,
};

export default GraphDisplay;
