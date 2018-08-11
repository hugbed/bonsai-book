import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class ImageDropzone extends Component {
  render() {
    return (
      <Dropzone
        style={{height: '100%', width: '100%'}}
        disableClick={true}
        disablePreview={true}
        multiple={false}
        accept="image/*"
        onDrop={(acceptedFiles, rejectedFiles) => this.props.onDrop(acceptedFiles, rejectedFiles)}>

        {this.props.children}

      </Dropzone>
    );
  }
}

export default ImageDropzone;
