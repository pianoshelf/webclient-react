
import FontAwesome from 'react-fontawesome';
import React from 'react';

export default function Spinner() {
  return (
    <div className="search__spinner">
      <FontAwesome name="cog" spin />
    </div>
  );
}
