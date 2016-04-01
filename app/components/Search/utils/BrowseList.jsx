
import React from 'react';

import SheetMusicResult from '../../Misc/SheetMusicResult';

export default function BrowseList({ sheetMusicList }) {
  const listElements = sheetMusicList.map((sheetMusic, index) => (
    <SheetMusicResult sheetMusic={sheetMusic} key={index} />
  ));

  return (
    <If condition={sheetMusicList.length > 0}>
      <div>
        {listElements}
      </div>
    <Else />
      <div className="search__results-not-found">
        No results
      </div>
    </If>
  );
}

BrowseList.propTypes = {
  sheetMusicList: React.PropTypes.array.isRequired,
};
