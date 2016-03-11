
import classNames from 'classnames';
import React from 'react';

import { getDifficultyText } from '../../../utils/sheetMusicUtils';

export default function DifficultyLevelTag({ difficulty }) {
  if (!difficulty) return <span />;

  const className = classNames('search__result-property', {
    'search__result-property--blue': difficulty === 1,
    'search__result-property--green': difficulty === 2 || difficulty === 3,
    'search__result-property--orange': difficulty === 4,
    'search__result-property--red': difficulty === 5,
  });
  return (
    <li className={className} key="difficulty">
      {getDifficultyText(difficulty)}
    </li>
  );
}

DifficultyLevelTag.propTypes = {
  difficulty: React.PropTypes.number.isRequired,
};
