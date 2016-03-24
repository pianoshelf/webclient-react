
import React from 'react';
import { reduxForm } from 'redux-form';

// Import other components
import beautifyFileName from '../../utils/beautifyFileName';
import Dropzone, { ERROR_SIZE, ERROR_TYPE } from './Dropzone';
import Checkbox from '../Misc/Checkbox';
import Radio from '../Misc/Radio';
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
  'composer',
  'style',
  'date',
  'description',
  'arrangement',
  'arrangedBy',
  'arranger',
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

  componentDidUpdate(prevProps) {
    const { fields } = this.props;

    // Check if file was just uploaded and there is no error.
    if (!prevProps.fields.file.value &&
        fields.file.value && fields.file.value.length &&
          !fields.file.error && fields.title.pristine) {
      fields.title.onChange(beautifyFileName(fields.file.value[0].name));
    }
  }

  handleUpload = file => {
    const { fields } = this.props;
    fields.file.onChange(file);
  };

  handleDismiss = () => {
    const { fields } = this.props;
    fields.file.onChange();
  };

  handleSubmit = values => {
    const { fields } = this.props;
    const data = new FormData();
    data.append('file', fields.file.value[0]);
    data.append('title');
    data.append('composer', '');
    data.append('style', '');
    data.append('date', '');
    data.append('description', '');
    data.append('arrangement', '');
    data.append('key', '');

    console.log('submitting');
    console.log(values);
  };

  handleArrangersNameFocus = event => {
    this.props.fields.arranger.onFocus(event);
    this.props.fields.arrangedBy.onChange('notSelfArranged');
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
              {...fields.composer}
              placeholder="Original Artist / Composer"
            />
          </Field>
          <Field
            tip="Enter the style of the sheet music."
            example="Classical"
          >
            <Input
              icon="music"
              {...fields.style}
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
              checked={fields.arrangement.checked}
              onChange={fields.arrangement.onChange}
            >
              Arrangement
            </Checkbox>
            <If condition={fields.arrangement.checked}>
              <div>
                <Radio
                  name="arrangedBy"
                  {...fields.arrangedBy}
                  value="selfArranged"
                  checked={fields.arrangedBy.value === 'selfArranged'}
                  className="upload__options-input-field-arrangers"
                >
                  Arranged by me
                </Radio>
                <Radio
                  name="arrangedBy"
                  {...fields.arrangedBy}
                  value="notSelfArranged"
                  checked={fields.arrangedBy.value === 'notSelfArranged'}
                  className="upload__options-input-field-arrangers"
                >
                  <Input
                    {...fields.arranger}
                    onFocus={this.handleArrangersNameFocus}
                    placeholder="Arranger's Name"
                    className="upload__options-input-field-arrangers-input"
                  />
                </Radio>
              </div>
            </If>
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
