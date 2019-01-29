import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import GraphDisplay from './GraphDisplay';
import machineValidator from '@cloudseam/machine-validator';

class MachineInfoDisplay extends Component {
  state = {
    isValid : null,
    error : null,
  };

  componentDidUpdate(prevProps) {
    if (this.props.machineJson !== prevProps.machineJson) {
      machineValidator(this.props.machineJson)
        .then(() => this.setState({ isValid : true }))
        .catch((error) => this.setState({ isValid : false, error }));

      this.setState({ isValid: null, error: null });
    }
  }

  render() {
    const { error } = this.state;
    const { machineJson } = this.props;

    return (
      <div style={{ padding: '15px' }}>
        { error && <div>ERROR: { error.message }</div>}
        <GraphDisplay machineJson={error ? {} : machineJson} />
      </div>
    );
  }
}

MachineInfoDisplay.propTypes = {
    machineJson : PropTypes.object,
};

export default MachineInfoDisplay;
