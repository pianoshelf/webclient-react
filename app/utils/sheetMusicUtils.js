
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

/**
 * Function that converts a sheet music object to a format we're comfortable with on the client
 * side. For example, keys with underscores are converted to a camelCase format.
 *
 * @param {Object} sheetMusic An object representing the sheet music.
 *
 * @return {Object} An object with all the necessary properties representing a sheet music.
 */
export function convertSheetMusic(sheetMusic) {
  const videos = sheetMusic.videos || [];
  return {
    id: sheetMusic.id,
    title: sheetMusic.title,
    musicStyle: sheetMusic.style,
    musicKey: sheetMusic.key,
    date: sheetMusic.date,
    composer: sheetMusic.composer_name,
    license: sheetMusic.license,
    submittedBy: sheetMusic.submitted_by,
    thumbnailUrl: sheetMusic.thumbnail_url,
    viewCount: sheetMusic.view_count,
    uniqueUrl: sheetMusic.uniqueurl,
    difficulty: sheetMusic.difficulty,
    videos: videos.map(video => ({
      title: video.title,
      youtubeId: video.youtube_id,
      date: video.date,
      grade: video.grade,
      user: video.user,
    })),
    images: sheetMusic.images,
    comments: sheetMusic.comments,
    fileSize: sheetMusic.file_size,
    originalFormat: sheetMusic.original_format,
    lilypondFile: sheetMusic.lilypond_file,
    midiFile: sheetMusic.midi_file,
    shortDescription: sheetMusic.short_description || sheetMusic.description,
    longDescription: sheetMusic.long_description,
    inShelf: sheetMusic.in_shelf,
  };
}

/**
 * Function that maps through sheet music keys and returns a format we're comfortable with on the
 * client side.
 *
 * @param {Array} sheetMusicArray Array of objects representing the sheet music.
 * @param {Function=} iterator Can be used to extract sheet music from a specific property in
 *     object.
 *
 * @return {Object} An object with all the necessary properties representing a sheet music.
 */
export function mapSheetMusic(sheetMusicArray = [], iterator = value => value) {
  return sheetMusicArray.map(sheetMusicItem =>
    convertSheetMusic(iterator(cloneDeep(sheetMusicItem)))
  );
}

/**
 * Function that returns a React PropType for the sheet music object defined above.
 *
 * @return {Function} React PropType for the object above.
 */
export function sheetMusicPropType() {
  return React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    musicStyle: React.PropTypes.string.isRequired,
    musicKey: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
    composer: React.PropTypes.string.isRequired,
    license: React.PropTypes.string.isRequired,
    submittedBy: React.PropTypes.number.isRequired,
    thumbnailUrl: React.PropTypes.string.isRequired,
    viewCount: React.PropTypes.number.isRequired,
    uniqueUrl: React.PropTypes.string.isRequired,
    difficulty: React.PropTypes.number.isRequired,
    videos: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      youtubeId: React.PropTypes.string.isRequired,
      date: React.PropTypes.string.isRequired,
      grade: React.PropTypes.string.isRequired,
      user: React.PropTypes.string.isRequired,
    })),
    images: React.PropTypes.arrayOf(React.PropTypes.string),
    comments: React.PropTypes.any,
    fileSize: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number),
    originalFormat: React.PropTypes.string,
    lilypondFile: React.PropTypes.any,
    midiFile: React.PropTypes.any,
    shortDescription: React.PropTypes.string,
    longDescription: React.PropTypes.string,
    inShelf: React.PropTypes.bool,
  });
}

/**
 * Function that converts a difficulty integer to text.
 *
 * @param {Number} difficulty Number representing the difficulty of sheet music. Ex. 1 for Beginner.
 *
 * @return {String} A string representing the difficulty.
 */
export function getDifficultyText(difficultyLevel) {
  switch (difficultyLevel) {
    case 1: return 'Beginner';
    case 2: return 'Novice';
    case 3: return 'Intermediate';
    case 4: return 'Advanced';
    case 5: return 'Expert';
    default: return 'Not Rated';
  }
}
