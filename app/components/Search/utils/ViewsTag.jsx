
import FontAwesome from 'react-fontawesome';
import numeral from 'numeral';
import React from 'react';

export default function ViewsTag({ viewCount }) {
  if (!viewCount) return <span />;
  const formatted = numeral(viewCount).format('0a');
  return (
    <li className="search__result-property search__result-property--dark" key="views">
      <FontAwesome name="eye" className="search__result-property-icon" />
      {formatted}
    </li>
  );
}

ViewsTag.propTypes = {
  viewCount: React.PropTypes.number.isRequired,
};
