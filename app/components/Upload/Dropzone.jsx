
import ReactDropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';
import React from 'react';

export default class Dropzone extends React.Component {
  static propTypes = { };

  handleClick = event => event.preventDefault();

  render() {
    return (
      <ReactDropzone
        className="upload__dropzone"
        activeClassName="upload__dropzone--active"
        multiple={false}
        accept="application/pdf"
      >
        <a href="#" onClick={this.handleClick} className="upload__dropzone-link">
          <FontAwesome className="upload__dropzone-cloud" name="cloud-upload" />
          <div className="upload__dropzone-text">
            <div className="upload__dropzone-text-large">
              Drag your sheet music here or click to browse.
            </div>
            <div className="upload__dropzone-text-small">
              10MB limit
            </div>
            <div className="upload__dropzone-text-small">
              Supported formats: PDF
            </div>
          </div>
        </a>
      </ReactDropzone>
    );
  }
}
