
import React from 'react';
import { reduxForm } from 'redux-form';

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

const FIELD_NAMES = [
  'file',
  'title',
  'author',
  'genre',
  'description',
  'arrangement',
  'key',
];

@reduxForm(
  {
    form: 'upload',
    fields: FIELD_NAMES,
  }
)
export default class Upload extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('submit!');
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
    const { fields } = this.props;
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
              {...fields.title}
              placeholder="Title"
            />
          </Field>
          <Field
            tip="Enter the original artist or composer who made the music."
            example="Beethoven"
          >
            <Input
              icon="user"
              {...fields.author}
              placeholder="Original Artist / Composer"
            />
          </Field>
          <Field
            tip="Enter the genre of the sheet music."
            example="Classical"
          >
            <Input
              icon="music"
              {...fields.genre}
              placeholder="Genre"
            />
          </Field>
          <Field
            tip="Enter a description about this piece."
            example="This is my favourite sheet music!"
          >
            <TextArea
              icon="pencil"
              {...fields.description}
              placeholder="Description"
            />
          </Field>
          <Field
            tip="Is the sheet music an arrangement of the original?"
          >
            <Checkbox
              label="Arrangement"
              value={fields.arrangement.value}
              onClick={fields.arrangement.onClick}
            />
          </Field>
          <Field
            tip="Enter the key of the sheet music."
            example="C major"
          >
            <Input
              icon="key"
              {...fields.key}
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
        <div>
          <button type="submit" className="upload__submit-button">
            Upload
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="upload">
        <NavBar />
        <ResponsiveContainer className="upload__container">
          <form onSubmit={this.handleSubmit}>
            {this.renderDropzone()}
            {this.renderOptions()}
            {this.renderSubmit()}
          </form>
        </ResponsiveContainer>
        <Footer />
      </div>
    );
  }
}
