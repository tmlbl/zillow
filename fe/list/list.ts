/**
 Global Libs
 */
import React = require('react');
import TR = require('typed-react');
import _ = require('lodash');


export interface ListGroup {
  renderTitle: (m:any)=> any;
  header: any;
  listItems: ListItemProps[];
}

export interface ListItemProps {
  renderItem: (m:any) => any;
  data:any;
  className?: string;
  onClick?: () => any;
}

export interface ListItemState {
  data:any;
}

export interface ListProps {
  className:string;
  listGroups: ListGroup[];
}

export interface ListState {
  listGroups:ListGroup[];
}

class _List extends TR.Component<ListProps, ListState> {
  getInitialState() {
    return {
      listGroups: this.props.listGroups
    }
  }

  render() {
    var listGroups = _.map(this.state.listGroups, (lg:ListGroup, top_index) => {
      var items = _.map(lg.listItems, (li:ListItemProps, index)=> {
        var line:any = null;

        if (index == lg.listItems.length - 1 && top_index != lg.listItems.length - 1) {
          line = React.createElement('div', {className: 'list-separator'});
        }

        return [React.createElement(ListItem, li), line];
      });
      return [
        //render title for each group
        lg.renderTitle(lg.header),
        //render all the items in each group
        items
      ]
    });
    return (React.createElement('div', {className: this.props.className}, listGroups));
  }
}

class _ListItem extends TR.Component<ListItemProps, ListItemState> {
  getInitialState() {
    return {
      data: this.props.data
    }
  }

  render() {
    return (
      React.createElement('div', {className: this.props.className},
        this.props.renderItem(this.state.data),
        React.createElement('div', {className: 'clear'})
      )
    );
  }
}

export var ListItem = TR.createClass(_ListItem);
export var List = TR.createClass(_List);

export var renderList = (props:ListProps, el:Element, cb?:any) => {
  return React.render(React.createElement(List, props), el, cb ? cb : ()=> {
  });
};