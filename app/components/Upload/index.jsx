
import React from 'react';

// Import other components
import Dropzone from './Dropzone';
import Checkbox from '../Misc/Checkbox';
import Input from '../Misc/Input';
import TextArea from '../Misc/TextArea';
import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';
import ResponsiveContainer from '../Misc/ResponsiveContainer';

export default class Upload extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  renderOptions() {
    return (
      <div className="upload__options">
        <div className="upload__options-title">
          Details
        </div>
        <div className="upload__options-input-field">
          <div className="upload__options-input">
            <Input
              icon="file-o"
              placeholder="Title"
            />
          </div>
          <div className="upload__options-input-field-tip">
            <div className="upload__options-input-field-tip-box">
              Enter the title of the sheet music.
            </div>
          </div>
        </div>
        <div className="upload__options-input-field">
          <div className="upload__options-input">
            <Input
              icon="user"
              placeholder="Original Artist / Composer"
            />
          </div>
          <div className="upload__options-input-field-tip">
            <div className="upload__options-input-field-tip-box">
              Enter the original artist or composer who made the music.
            </div>
          </div>
        </div>
        <div className="upload__options-input-field">
          <div className="upload__options-input">
            <Input
              icon="music"
              placeholder="Genre"
            />
          </div>
          <div className="upload__options-input-field-tip">
            <div className="upload__options-input-field-tip-box">
              Enter the genre of the sheet music (i.e Pop or Classical).
            </div>
          </div>
        </div>
        <div className="upload__options-input-field">
          <div className="upload__options-input">
            <TextArea
              placeholder="Description"
            />
          </div>
          <div className="upload__options-input-field-tip">
            <div className="upload__options-input-field-tip-box">
              Enter any extra information about this piece.
            </div>
          </div>
        </div>
        <div className="upload__options-input-field">
          <div className="upload__options-input">
            <Checkbox
              label="Arrangement"
            />
          </div>
          <div className="upload__options-input-field-tip">
            <div className="upload__options-input-field-tip-box">
              Is the sheet music an arrangement of the original?
            </div>
          </div>
        </div>
        <div className="upload__options-input-field">
          <div className="upload__options-input">
            <Input
              icon=""
              placeholder="Genre"
            />
          </div>
          <div className="upload__options-input-field-tip">
            <div className="upload__options-input-field-tip-box">
              Enter any extra information about this piece.
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="upload">
        <NavBar />
        <ResponsiveContainer className="upload__container">
          <Dropzone />
          {this.renderOptions()}
        </ResponsiveContainer>
        <Footer />
      </div>
    );
  }
}
