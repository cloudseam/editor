import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import brace from 'brace';
import AceEditor from 'react-ace';
import Dropzone from 'react-dropzone';
import YAML from 'yamljs';

import 'brace/mode/yaml';
import 'brace/theme/monokai';
import './Editor.css';

const overlayStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: '2.5em 0',
    background: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
    color: '#fff',
    zIndex: 10
};

class Editor extends Component {
  state = {
      yaml : "",
  };

  onChange = (newValue) => {
      this.setState({ yaml : newValue });

      if (this.timer) {
          clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        const js = YAML.parse(newValue);
        this.props.onMachineChange(js);
      }, 500);
  }

  onDrop = ([file]) => {
    if (!file.name.endsWith(".yml") && !file.name.endsWith(".yaml")) {
      alert("Only .yml or .yaml files are supported");
      return;
    }
    
    var reader = new FileReader();
    reader.addEventListener("loadend", (event) => this.onChange(event.target.result));
    reader.readAsText(file);
  }

  render() {
    const { yaml } = this.state;
    return (
        <Dropzone
            accept={''}
            onDrop={this.onDrop.bind(this)}
            disableClick
        >
        {({getRootProps, getInputProps, isDragActive}) => (
            <div {...getRootProps()} style={{position: "relative",height:"100%",width:"100%"}}>
              <input {...getInputProps()} />
              { isDragActive && <div style={overlayStyle}>Drop YAML file here</div> }   
                <AceEditor
                    mode="yaml"
                    theme="monokai"
                    onChange={this.onChange}
                    value={yaml}
                    name="editor"
                    fontSize={18}
                    height={"100%"}
                    width={"100%"}
                    minLines={10}
                    editorProps={{$blockScrolling: true}}
                    multiple={false}
                />
             </div>
        )}
        </Dropzone>
    );
  }
}

Editor.propTypes = {
    onMachineChange : PropTypes.func.isRequired,
};

export default Editor;
