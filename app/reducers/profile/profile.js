
import createReducer from '../../utils/createReducer';

import {
  PROFILE_GET,
  PROFILE_UPDATE_DESCRIPTION,
  PROFILE_UPDATE_PROFILE_PICTURE,
  PROFILE_MAKE_DESCRIPTION_EDITABLE,
} from '../../constants/profile';

function convertProfile(profile) {
  return {
    username: profile.username,
    fullName: profile.full_name,
    shelf: profile.shelf,
    description: profile.description,
    smallProfilePicture: profile.small_profile_picture,
    largeProfilePicture: profile.large_profile_picture,
  };
}

const initialState = {
  editableDescription: false,
  errorCode: 0,
  user: {},
};

export default createReducer(initialState, {
  [PROFILE_GET]: {
    done(state, payload) {
      return {
        ...initialState,
        user: convertProfile(payload),
      };
    },
    error(state, code) {
      return {
        ...initialState,
        errorCode: code,
      };
    },
  },

  [PROFILE_UPDATE_DESCRIPTION]: {
    done(state, payload) {
      return {
        ...state,
        editableDescription: false,
        errorCode: 0,
        user: {
          ...state.user,
          description: payload.description,
        },
      };
    },
    error(state, code) {
      return {
        ...state,
        errorCode: code,
      };
    },
  },

  [PROFILE_UPDATE_PROFILE_PICTURE]: {
    done(state, payload) {
      return {
        ...state,
        errorCode: 0,
        user: convertProfile(payload),
      };
    },
  },

  [PROFILE_MAKE_DESCRIPTION_EDITABLE]: state => ({
    ...state,
    editableDescription: true,
  }),
});
