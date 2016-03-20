
import React from 'react';
import { reduxForm } from 'redux-form';

// Import other components
import Dropzone, { ERROR_SIZE, ERROR_TYPE } from './Dropzone';
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

const MAX_FILE_SIZE = 10000000;

@reduxForm(
  {
    form: 'upload',
    fields: FIELD_NAMES,
    validate(values) {
      const errors = {};

      if (values.file && values.file.length > 0) {
        const file = values.file[0];

        if (file.size > MAX_FILE_SIZE) {
          errors.file = ERROR_SIZE;
        }

        if (file.type !== 'application/pdf' &&
            (file.type !== '' || !file.name.endsWith('.ly'))) {
          errors.file = ERROR_TYPE;
        }
      }

      return errors;
    },
  },
  state => ({
    inProgress: state.progress.inProgress,
  })
)
export default class Upload extends React.Component {
  static propTypes = {
    inProgress: React.PropTypes.array.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  };

  handleUpload = file => {
    const { fields } = this.props;
    fields.file.onChange(file);
  };

  handleDismiss = () => {
    const { fields } = this.props;
    fields.file.onChange();
  };

  handleSubmit = values => {
    console.log('submitting');
    console.log(values);
  };

  renderDropzone() {
    const { fields } = this.props;
    return (
      <div className="upload__dropzone-wrapper">
        <Title step={1} text="Upload file" />
        <Dropzone
          fileField={fields.file}
          onDrop={this.handleUpload}
          onDismiss={this.handleDismiss}
        />
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
              checked={fields.arrangement.checked}
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
    const { handleSubmit } = this.props;
    return (
      <div className="upload">
        <NavBar />
        <ResponsiveContainer className="upload__container">
          <form onSubmit={handleSubmit(this.handleSubmit)}>
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
