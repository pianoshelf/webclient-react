
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import omit from 'lodash/omit';
import React from 'react';

export default class Checkbox extends React.Component {
  render() {
    const { children, className, icon, required } = this.props;
    const props = omit(
      this.props,
      ['children', 'className', 'icon', 'required']
    );

    const groupClassName = classNames('misc-checkbox__group', className);

    return (
      <label className={groupClassName}>
        <input
          type="checkbox"
          className="misc-checkbox__input"
          {...props}
        />
        <span className="misc-checkbox__checkbox" />
        <span
          className="misc-checkbox__label"
        >
          <If condition={icon}>
            <FontAwesome name={icon} className="misc-checkbox__icon" />
          </If>
          <span>
            {children}
            <If condition={required}>
              <span className="misc-checkbox__label-star">*</span>
            </If>
          </span>
        </span>
        <span className="misc-checkbox__clear" />
      </label>
    );
  }
}
