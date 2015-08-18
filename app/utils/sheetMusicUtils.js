
import cloneDeep from 'lodash/lang/cloneDeep';
import React from 'react';

/**
 * Function that maps through sheet music keys and returns a format we're comfortable with on the
 * client side.
 *
 * @param {Array} sheetMusicArray Array of objects representing the sheet music.
 * @param {Function} iterator Can be used to extract sheet music from a specific property in object.
 *
 * @return {Object} An object with all the necessary properties representing a sheet music.
 */
export function mapSheetMusic(sheetMusicArray, iterator) {
  return sheetMusicArray.map(sheetMusicItem => {
    let sheetMusic = iterator ? iterator(cloneDeep(sheetMusicItem)) : sheetMusicItem;
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
    };
  });
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
  });
}

/**
 * Function that maps through paid sheet music keys and returns a format we're comfortable with on
 * the client side.
 *
 * @param {Array} sheetMusicArray Array of objects representing the sheet music.
 * @param {Function} iterator Can be used to extract sheet music from a specific property in object.
 *
 * @return {Object} An object with all the necessary properties representing a sheet music.
 */
export function mapPaidSheetMusic(sheetMusicArray, iterator) {
  return sheetMusicArray.map(sheetMusicItem => {
    let sheetMusic = iterator ? iterator(cloneDeep(sheetMusicItem)) : sheetMusicItem;
    return {
      detailedDescription: sheetMusic.detailed_description,
      instrument: sheetMusic.instrument,
      level: sheetMusic.level,
      musicFormat: sheetMusic.music_format,
      pageUrl: sheetMusic.page_url,
      shortDescription: sheetMusic.short_description,
      source: sheetMusic.source,
      thumbnailUrl: sheetMusic.thumbnail_url,
      title: sheetMusic.title,
    };
  });
}

/**
 * Function that returns a React PropType for the paid sheet music object.
 *
 * @return {Function} React PropType for the object above.
 */
export function paidSheetMusicPropType() {
  return React.PropTypes.shape({
    detailedDescription: React.PropTypes.string.isRequired,
    instrument: React.PropTypes.string.isRequired,
    level: React.PropTypes.string,
    musicFormat: React.PropTypes.string.isRequired,
    pageUrl: React.PropTypes.string.isRequired,
    shortDescription: React.PropTypes.string.isRequired,
    source: React.PropTypes.string.isRequired,
    thumbnailUrl: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
  });
}

