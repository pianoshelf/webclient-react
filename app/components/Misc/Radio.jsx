
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import omit from 'lodash/omit';
import React from 'react';

export default class Radio extends React.Component {
  render() {
    const { children, className, icon, required } = this.props;
    const props = omit(
      this.props,
      ['children', 'className', 'icon', 'required']
    );

    const groupClassName = classNames('misc-radio__group', className);

    return (
      <label className={groupClassName}>
        <input
          type="radio"
          className="misc-radio__input"
          {...props}
        />
        <span className="misc-radio__checkbox" />
        <span
          className="misc-radio__label"
        >
          <If condition={icon}>
            <FontAwesome name={icon} className="misc-radio__icon" />
          </If>
          <span>
            {children}
            <If condition={required}>
              <span className="misc-radio__label-star">*</span>
            </If>
          </span>
        </span>
        <span className="misc-radio__clear" />
      </label>
    );
  }
}
