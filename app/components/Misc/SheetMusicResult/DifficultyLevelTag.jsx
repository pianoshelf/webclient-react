
import classNames from 'classnames';
import React from 'react';

import { getDifficultyText } from '../../../utils/sheetMusicUtils';

export default function DifficultyLevelTag({ difficulty }) {
  if (!difficulty) return <span />;

  const className = classNames('sheet-music-result__property', {
    'sheet-music-result__property--blue': difficulty === 1,
    'sheet-music-result__property--green': difficulty === 2 || difficulty === 3,
    'sheet-music-result__property--orange': difficulty === 4,
    'sheet-music-result__property--red': difficulty === 5,
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
