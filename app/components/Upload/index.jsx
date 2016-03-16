
import React from 'react';

// Import other components
import Dropzone from './Dropzone';
import Checkbox from '../Misc/Checkbox';
import Field from './utils/Field';
import Input from '../Misc/Input';
import TextArea from '../Misc/TextArea';
import Title from './utils/Title';
import NavBar from '../Fixtures/NavBar';
import Footer from '../Fixtures/Footer';
import ResponsiveContainer from '../Misc/ResponsiveContainer';

export default class Upload extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  renderDropzone() {
    return (
      <div className="upload__dropzone-wrapper">
        <Title step={1} text="Upload file" />
        <Dropzone />
      </div>
    );
  }

  renderOptions() {
    return (
      <div className="upload__options">
        <Title step={2} text="Enter details" />
        <div>
          <Field
            tip="Enter the title of the sheet music."
            example={"F\u00FCr Elise"}
          >
            <Input
              icon="file-o"
              placeholder="Title"
            />
          </Field>
          <Field
            tip="Enter the original artist or composer who made the music."
            example="Beethoven"
          >
            <Input
              icon="user"
              placeholder="Original Artist / Composer"
            />
          </Field>
          <Field
            tip="Enter the genre of the sheet music."
            example="Classical"
          >
            <Input
              icon="music"
              placeholder="Genre"
            />
          </Field>
          <Field
            tip="Enter a description about this piece."
            example="This is my favourite sheet music!"
          >
            <TextArea
              icon="pencil"
              placeholder="Description"
            />
          </Field>
          <Field
            tip="Is the sheet music an arrangement of the original?"
          >
            <Checkbox
              label="Arrangement"
            />
          </Field>
          <Field
            tip="Enter the key of the sheet music."
            example="C major"
          >
            <Input
              icon="key"
              placeholder="Key"
            />
          </Field>
        </div>
      </div>
    );
  }

  renderSubmit() {
    return (
      <div className="upload__submit">
        <Title step={3} text="Submit" />
      </div>
    );
  }

  render() {
    return (
      <div className="upload">
        <NavBar />
        <ResponsiveContainer className="upload__container">
          {this.renderDropzone()}
          {this.renderOptions()}
          {this.renderSubmit()}
        </ResponsiveContainer>
        <Footer />
      </div>
    );
  }
}
