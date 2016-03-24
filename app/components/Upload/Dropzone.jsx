
import classNames from 'classnames';
import ReactDropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';
import React from 'react';

export const ERROR_SIZE = 'ERROR_SIZE';
export const ERROR_TYPE = 'ERROR_TYPE';

export default class Dropzone extends React.Component {
  static propTypes = {
    onDrop: React.PropTypes.func.isRequired,
    onDismiss: React.PropTypes.func.isRequired,
    fileField: React.PropTypes.object.isRequired,
  };

  handleClick = event => event.preventDefault();

  handleDismissClick = event => {
    event.preventDefault();
    this.props.onDismiss();
  };

  render() {
    const { onDrop, fileField } = this.props;
    const { value } = fileField;

    if (value && value.length > 0) {
      const file = value[0];

      const dropzoneClassName = classNames('upload__dropzone', {
        'upload__dropzone--success': !fileField.error,
        'upload__dropzone--error': fileField.error,
      });

      const errorMessage = (() => {
        switch (fileField.error) {
          case ERROR_SIZE:
            return 'The file is larger than 10MB.';
          case ERROR_TYPE:
            return 'The file is not a supported file type.';
          default:
            return 'File has been uploaded.';
        }
      })();

      return (
        <div className={dropzoneClassName}>
          <a
            href="#"
            onClick={this.handleDismissClick}
            className="upload__dropzone-link upload__dropzone-link--uploaded"
          >
            <If condition={fileField.error}>
              <FontAwesome
                className="upload__dropzone-icon upload__dropzone-icon--error"
                name="close"
              />
            <Else />
              <FontAwesome
                className="upload__dropzone-icon upload__dropzone-icon--success"
                name="check"
              />
            </If>
            <div className="upload__dropzone-text">
              <div className="upload__dropzone-text-large upload__dropzone-text-large--uploaded">
                {file.name}
              </div>
              <div className="upload__dropzone-text-small">
                {errorMessage}
              </div>
              <div className="upload__dropzone-text-dismiss-message">
                <FontAwesome className="upload__dropzone-text-dismiss-message-icon" name="close" />
                <If condition={fileField.error}>
                  Click here to dismiss.
                <Else />
                  Click here to cancel.
                </If>
              </div>
            </div>
          </a>
        </div>
      );
    }

    // Return drop zone
    return (
      <ReactDropzone
        className="upload__dropzone"
        activeClassName="upload__dropzone--active"
        multiple={false}
        accept="application/pdf,.ly"
        onDrop={onDrop}
      >
        <a href="#" onClick={this.handleClick} className="upload__dropzone-link">
          <FontAwesome className="upload__dropzone-icon" name="cloud-upload" />
          <div className="upload__dropzone-text">
            <div className="upload__dropzone-text-large">
              Drag your sheet music here or click to browse.
            </div>
            <div className="upload__dropzone-text-small">
              10MB limit
            </div>
            <div className="upload__dropzone-text-small">
              Supported formats: PDF, Lilypond
            </div>
          </div>
        </a>
      </ReactDropzone>
    );
  }
}
