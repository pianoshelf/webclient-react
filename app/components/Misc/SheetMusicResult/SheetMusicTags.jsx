
import React from 'react';

export default function SheetMusicTags({ tags }) {
  const mappedElements = tags.map((tag, index) => (
    <li className="sheet-music-result__property" key={index}>{tag}</li>
  ));
  return (
    <span>
      {mappedElements}
    </span>
  );
}

SheetMusicTags.propTypes = {
  tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};
