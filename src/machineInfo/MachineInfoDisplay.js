import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GraphDisplay from './GraphDisplay';
import machineValidator from '@cloudseam/machine-validator';
import { withTheme } from '@material-ui/core/styles';

class MachineInfoDisplay extends Component {
  state = {
    isValid : null,
    error : null,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.machineJson !== nextProps.machineJson) {
      machineValidator(nextProps.machineJson)
        .then(() => this.setState({ isValid : true, error : null, }))
        .catch((error) => this.setState({ isValid : false, error }));
    }

    return this.props.machineJson === nextProps.machineJson && nextState.isValid !== null;
  }

  render() {
    const { error, isValid } = this.state;
    const { machineJson, theme } = this.props;

    return (
      <div style={{ padding: '15px' }}>
        { error && (
          <div
            style={{
              backgroundColor: theme.palette.error.dark,
              color: theme.palette.error.contrastText,
              padding: "10px 15px",
              marginBottom: "20px"
            }}
          >
            <strong>ERROR:</strong>&nbsp;
            Your machine definition is not valid. We'll eventually make the message easier to read.
            <br /><br />
            Details: { error.message }
          </div>
        )}
        <GraphDisplay machineJson={isValid ? machineJson : null} />
      </div>
    );
  }
}

MachineInfoDisplay.propTypes = {
    machineJson : PropTypes.object,
};

export default withTheme()(MachineInfoDisplay);
