
import classNames from 'classnames';
import React from 'react';

import { getDifficultyText } from '../../../utils/sheetMusicUtils';

export default function DifficultyLevelTag({ difficultyLevel }) {
  const className = classNames('search__result-property', {
    'search__result-property--blue': difficultyLevel === 1,
    'search__result-property--green': difficultyLevel === 2 || difficultyLevel === 3,
    'search__result-property--orange': difficultyLevel === 4,
    'search__result-property--red': difficultyLevel === 5,
  });

  return (
    <div className={className} key="difficulty">
      {getDifficultyText(difficultyLevel)}
    </div>
  );
}

DifficultyLevelTag.propTypes = {
  difficultyLevel: React.PropTypes.number.isRequired,
};
