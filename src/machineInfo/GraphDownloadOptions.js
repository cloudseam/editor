import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { ArrowDropDown } from '@material-ui/icons';

class GraphDownloadOptions extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  downloadPng = () => {
    const canvas = document.createElement('canvas');
    window.canvg(canvas, this.props.svg);

    const link = document.createElement('a');
    link.download = 'state-chart.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  downloadSvg = () => {
    const link = document.createElement('a');
    link.download = 'state-chart.svg';
    link.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(this.props.svg);
    link.click();
  }

  render() {
    const { anchorEl } = this.state;
    const { svg } = this.props;

    return (
      <div>
        <Button
          variant="contained"
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          disabled={!!!svg}
        >
          Download <ArrowDropDown />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          disableAutoFocusItem={true}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.downloadPng}>As PNG</MenuItem>
          <MenuItem onClick={this.downloadSvg}>As SVG</MenuItem>
        </Menu>
      </div>
    );
  }
}

GraphDownloadOptions.propTypes = {
    svg : PropTypes.string.isRequired,
};

export default GraphDownloadOptions;
