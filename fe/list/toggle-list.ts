/**
 Global Libs
 */
import React = require('react');
import TR = require('typed-react');
import _ = require('lodash');

import Icons = require('../misc/icon');

export interface ToggleListProps {
  listItemProps: Icons.IconProps[];
  className?: string;
}

class _ToggleList extends TR.Component<ToggleListProps,{}> {
  render() {
    var items = this.props.listItemProps.map((li:Icons.IconProps) => {
      return React.createElement(Icons.FaToggleIcon, li)
    });
    return React.createElement('div', {className: this.props.className}, items)
  }
}

export var ToggleList = TR.createClass(_ToggleList);

export var renderList = (props:ToggleListProps, el:Element, cb?:any) => {
  React.render(React.createElement(ToggleList, props), el, cb);
};
