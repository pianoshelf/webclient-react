
import createAction from '../utils/createAction';
import { actionDone } from '../utils/actionUtils';
import { UPLOAD_PDF } from '../constants/upload';
import { upload } from '../utils/api';

export const uploadFile = createAction(
  UPLOAD_PDF,
  async formData => {
    const response = await upload('/submit/sheetmusic/', formData);
    return response;
  }
);
