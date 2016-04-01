
import FontAwesome from 'react-fontawesome';
import numeral from 'numeral';
import React from 'react';

export default function ViewsTag({ viewCount }) {
  if (!viewCount) return <span />;
  const formatted = numeral(viewCount).format('0a');
  return (
    <li className="sheet-music-result__property sheet-music-result__property--dark" key="views">
      <FontAwesome name="eye" className="sheet-music-result__property-icon" />
      {formatted}
    </li>
  );
}

ViewsTag.propTypes = {
  viewCount: React.PropTypes.number.isRequired,
};
