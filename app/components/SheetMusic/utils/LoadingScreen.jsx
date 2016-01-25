
import FontAwesome from 'react-fontawesome';
import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="sheetmusic__spinner">
      <FontAwesome name="cog" spin />
    </div>
  );
}
