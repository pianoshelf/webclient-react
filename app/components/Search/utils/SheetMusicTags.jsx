
import React from 'react';

export default function SheetMusicTags({ tags }) {
  return tags.map((tag, index) => <li className="search__result-property" key={index}>{tag}</li>);
}

SheetMusicTags.propTypes = {
  tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};
