import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { ArrowDropDown } from '@material-ui/icons';

const options = [
    { key : 'left-right', display : 'Horizontal' },
    { key : 'top-down', display : 'Vertical' },
];

class GraphDirectionSelection extends Component {
  state = {
    anchorEl: null,
    selectedIndex: 0,
  };

  handleListItemClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
    this.props.onDirectionChange(options[index].key);
  };

  handleMenuClose = (direction) => {
    this.setState({ anchorEl : null });
  };

  render() {
    const { anchorEl, selectedIndex } = this.state;

    return (
        <Fragment>
          <List component="nav">
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              aria-label="Graph Direction"
              onClick={this.handleListItemClick}
            >
              <ListItemText
                secondary={options[selectedIndex].display}
              >
                Graph Direction <ArrowDropDown style={{fontSize:"16px"}} />
              </ListItemText>
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleMenuClose}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option.key}
                selected={index === selectedIndex}
                onClick={event => this.handleMenuItemClick(event, index)}
              >
                {option.display}
              </MenuItem>
            ))}
          </Menu>
        </Fragment>
      );
  }
}

GraphDirectionSelection.propTypes = {
    direction : PropTypes.string.isRequired,
    onDirectionChange : PropTypes.func.isRequired,
};

export default GraphDirectionSelection;
