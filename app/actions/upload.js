
import createAction from '../utils/createAction';
import { actionError } from '../utils/actionUtils';
import { errors } from '../utils/constants';
import { upload } from '../utils/api';
import { UPLOAD_FILE } from '../constants/upload';

function createFormData(fileData) {
  const data = new FormData();
  data.append('file', fileData.file[0]);
  data.append('title', fileData.title);

  if (fileData.composer) {
    data.append('composer_name', fileData.composer);
  }

  if (fileData.style) {
    data.append('style', fileData.style);
  }

  if (fileData.description) {
    data.append('desc', fileData.description);
  }

  if (fileData.date) {
    data.append('date', fileData.date);
  }

  if (fileData.key) {
    data.append('key', fileData.key);
  }

  data.append('is_arrangement', fileData.isArrangement);
  if (fileData.isArrangement) {
    data.append('self_arranged', fileData.selfArranged);
    if (!fileData.selfArranged) {
      data.append('composer', fileData.arranger);
    }
  }

  return data;
}

export const uploadFile = createAction(
  UPLOAD_FILE,
  async fileData => {
    // Make sure there is a file being uploaded.
    if (!fileData.file) {
      return actionError(errors.NO_FILE);
    }

    // Make sure there is a title.
    if (!fileData.title) {
      return actionError(errors.NO_TITLE);
    }

    // Make sure there is a composer.
    if (!fileData.composer) {
      return actionError(errors.NO_COMPOSER);
    }

    const formData = createFormData(fileData);
    const response = await upload('/submit/sheetmusic/', formData);
    return response;
  }
);
