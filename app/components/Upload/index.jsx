
import FontAwesome from 'react-fontawesome';
import Helmet from 'react-helmet';
import React from 'react';
import { asyncConnect } from 'redux-async-connect';
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
import { errors } from '../../utils/constants';
import { clearErrors, uploadFile } from '../../actions/upload';

const SELF_ARRANGED = 'SELF_ARRANGED';
const NOT_SELF_ARRANGED = 'NOT_SELF_ARRANGED';

const FIELD_NAMES = [
  'file',
  'title',
  'composer',
  'style',
  'date',
  'description',
  'isArrangement',
  'arrangedBy',
  'arranger',
  'key',
];

const MAX_FILE_SIZE = 10000000;

@asyncConnect({
  promise: (params, { store }) => store.dispatch(clearErrors()),
})
@reduxForm(
  {
    form: 'upload',
    fields: FIELD_NAMES,
    initialValues: { arrangedBy: SELF_ARRANGED },
    validate(values) {
      // TODO: Put all this in our own redux actions instead of relying on redux-form
      const validationErrors = {};

      if (values.file && values.file.length > 0) {
        const file = values.file[0];

        if (file.size > MAX_FILE_SIZE) {
          validationErrors.file = ERROR_SIZE;
        }

        if (file.type !== 'application/pdf' &&
            (file.type !== '' || !file.name.endsWith('.ly'))) {
          validationErrors.file = ERROR_TYPE;
        }
      }

      return validationErrors;
    },
  },
  state => ({
    inProgress: state.progress.inProgress,
    errorCode: state.upload.errorCode,
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

  getErrorMessage() {
    const { errorCode } = this.props;
    switch (errorCode) {
      case errors.NO_FILE:
        return 'Please upload a file before submitting.';
      case errors.NO_TITLE:
        return 'Please enter a title for the sheet music.';
      case errors.NO_COMPOSER:
        return 'Please enter a composer for the sheet music.';
      default:
        return null;
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

  handleSubmit = (values, dispatch) => {
    dispatch(uploadFile({
      file: values.file,
      title: values.title,
      composerName: values.composer,
      style: values.style,
      description: values.description,
      date: values.date,
      key: values.key,
      isArrangement: values.isArrangement,
      selfArranged: values.selfArranged === SELF_ARRANGED,
      arranger: values.arranger,
    }));
  };

  handleArrangersNameChange = event => {
    this.props.fields.arranger.onChange(event);
    this.props.fields.arrangedBy.onChange(NOT_SELF_ARRANGED);
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
    const { errorCode, fields } = this.props;
    return (
      <div className="upload__options">
        <Title step={2} text="Enter details" />
        <div>
          <Field
            tip="Enter the title of the sheet music."
            example={"F\u00FCr Elise"}
          >
            <Input
              errorWhen={errorCode === errors.NO_TITLE}
              icon="file-o"
              {...fields.title}
              placeholder="Title"
              required
            />
          </Field>
          <Field
            tip="Enter the original artist or composer who made the music."
            example="Beethoven"
          >
            <Input
              errorWhen={errorCode === errors.NO_COMPOSER}
              icon="user"
              {...fields.composer}
              placeholder="Original Artist / Composer"
              required
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
              checked={fields.isArrangement.checked}
              onChange={fields.isArrangement.onChange}
            >
              Arrangement
            </Checkbox>
            <If condition={fields.isArrangement.checked}>
              <div>
                <Radio
                  name="arrangedBy"
                  {...fields.arrangedBy}
                  value={SELF_ARRANGED}
                  checked={fields.arrangedBy.value === SELF_ARRANGED}
                  className="upload__options-input-field-arrangers"
                >
                  Arranged by me
                </Radio>
                <Radio
                  name="arrangedBy"
                  {...fields.arrangedBy}
                  value={NOT_SELF_ARRANGED}
                  checked={fields.arrangedBy.value === NOT_SELF_ARRANGED}
                  className="upload__options-input-field-arrangers"
                >
                  <Input
                    {...fields.arranger}
                    onChange={this.handleArrangersNameChange}
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
    const { fields, handleSubmit } = this.props;
    return (
      <div className="upload__submit">
        <Title step={3} text="Submit" />
        <div>
          <button
            className="upload__submit-button"
            onClick={handleSubmit(this.handleSubmit)}
            disabled={!fields.file.value}
          >
            Upload
          </button>
          {this.renderSubmitLabel()}
        </div>
      </div>
    );
  }

  renderSubmitLabel() {
    const { errorCode, fields } = this.props;

    if (!fields.file.value) {
      return (
        <div className="upload__submit-label">
          <FontAwesome name="info-circle" className="upload__submit-label-icon" />
          Please upload a file before submitting.
        </div>
      );
    }

    if (!errorCode) {
      return null;
    }

    return (
      <div className="upload__submit-label">
        <FontAwesome
          name="close"
          className="upload__submit-label-icon upload__submit-label-icon--error"
        />
        {this.getErrorMessage()}
      </div>
    );
  }

  render() {
    return (
      <div className="upload">
        <Helmet title="Upload Sheet Music" />
        <NavBar />
        <ResponsiveContainer className="upload__container">
          <div>
            {this.renderDropzone()}
            {this.renderOptions()}
            {this.renderSubmit()}
          </div>
        </ResponsiveContainer>
        <Footer />
      </div>
    );
  }
}
