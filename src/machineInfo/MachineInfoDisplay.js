import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GraphDisplay from './GraphDisplay';
import machineValidator from '@cloudseam/machine-validator';

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
    const { machineJson } = this.props;

    return (
      <div style={{ padding: '15px' }}>
        { error && <div>ERROR: { error.message }</div>}
        <GraphDisplay machineJson={isValid ? machineJson : null} />
      </div>
    );
  }
}

MachineInfoDisplay.propTypes = {
    machineJson : PropTypes.object,
};

export default MachineInfoDisplay;
