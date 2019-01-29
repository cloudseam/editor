import React, { Component } from 'react';
import PropTypes from 'prop-types';
import machineToSmcat from './machineToSmcat';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import './GraphDisplay.css';
import svgPanZoom from 'svg-pan-zoom';

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
    if (this.refs.graph) {
      const svg = this.refs.graph.querySelector("svg");
      if (svg) svgPanZoom(svg);
    }
  }

  componentDidUpdate() {
    const svg = this.refs.graph.querySelector("svg");
    if (svg) svgPanZoom(svg);
  }

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = (direction) => {
    if (!direction) direction = this.state.direction;
    this.setState({ anchorEl: null, direction });
  };

  download = () => {
    const canvas = document.createElement('canvas');
    window.canvg(canvas, this.state.svg);

    const link = document.createElement('a');
    link.download = 'state-chart.png';
    link.href = canvas.toDataURL();
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
                aria-owns={anchorEl ? 'direction-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenuClick}
            >
                { direction }
            </Button>
            <Menu
                id="direction-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => this.handleMenuClose()}
            >
                <MenuItem onClick={() => this.handleMenuClose('Left-Right')}>Left-Right</MenuItem>
                <MenuItem onClick={() => this.handleMenuClose('Top-Down')}>Top-Down</MenuItem>
            </Menu>

            { svg && <div id="graph-output" ref="graph" dangerouslySetInnerHTML={{ __html: svg }} /> }
        </div>
    );
  }
}

GraphDisplay.propTypes = {
    machineJson : PropTypes.object,
};

export default GraphDisplay;
