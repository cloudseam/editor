import React, { Component } from 'react';
import PropTypes from 'prop-types';
import machineToSmcat from './machineToSmcat';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GraphDirectionSelection from './GraphDirectionSelection';
import GraphDownloadOptions from './GraphDownloadOptions';
import './GraphDisplay.css';
import svgPanZoom from 'svg-pan-zoom';

class GraphDisplay extends Component {
  state = {
    smCatConfig : null,
    direction : 'Left-Right',
  };

  svgPanObject = null;

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
      this.updateGraphDisplay();
    }
  }

  componentDidUpdate() {
    this.updateGraphDisplay();
  }

  updateGraphDisplay = () => {
    if (!this.refs.graph)
      return;

    const svg = this.refs.graph.querySelector("svg");
    if (svg) {
      if (this.svgPanObject)
        this.svgPanObject.destroy();
      this.svgPanObject = svgPanZoom(svg);
    }
  };

  onDirectionChange = (direction) => {
    this.setState({ direction });
  };

  render() {
    const { svg, direction } = this.state;

    return (
        <div id='graph-display'>
            
            <Typography variant="h5" color="inherit">
              State Machine Graph
            </Typography>

            <Grid container spacing={16} alignItems="center">
              <Grid item sm={3}>
                <GraphDirectionSelection direction={direction} onDirectionChange={this.onDirectionChange} />
              </Grid>
              <Grid item sm={3}>
                <GraphDownloadOptions svg={svg} />
              </Grid>
            </Grid>

            { svg && <div id="graph-output" ref="graph" dangerouslySetInnerHTML={{ __html: svg }} /> }
        </div>
    );
  }
}

GraphDisplay.propTypes = {
    machineJson : PropTypes.object,
};

export default GraphDisplay;
