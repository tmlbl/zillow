import React = require("react/addons");
import TR = require("typed-react");


var RCTG = React.addons.CSSTransitionGroup;

export interface IconProps {
  src:string;
  id?:string;
  className?: string;
  tooltip?:string;
  float?:string;
  onClick?: (e)=> any;
}

export interface IconWithTextProps extends IconProps {
  text:string;
}

export interface IconWithTextState {
  text:string;
}

export interface ToggleFaIconState {
  checked:boolean;
}

class _FaIcon extends TR.Component<IconProps, {}> {
  render() {
    var cn = this.props.className ? this.props.className : '';
    return React.createElement('i', {
      className: 'fa fa-' + this.props.src + ' ' + cn,
      onClick: this.props.onClick,
      float: this.props.float ? this.props.float : ''
    })
  }
}

class _FaToggleIcon extends TR.Component<IconProps, ToggleFaIconState> {
  getInitialState() {
    return {
      checked: false
    }
  }

  render() {
    var check:any = null,
      spanProps:{className:string; dataTooltip?:string; onClick:(e) => void} = {
        className: 'fa-stack fa-lg',
        onClick: (e)=> {
          this.setState({checked: !this.state.checked});
          this.props.onClick(e);
        }
      };
    if (this.props.tooltip) {
      spanProps.dataTooltip = this.props.tooltip;

    }
    //if (this.state.checked) {
    //  check = React.createElement('i', {
    //    key: this.props.id,
    //    className: "fa fa-check-circle fa-stack-2x",
    //    style: {color: 'green'}
    //  })
    //}

    return (
      React.createElement('span', spanProps,
        React.createElement('i', {className: 'fa fa-' + this.props.src + ' fa-2x'}),
        React.createElement('div', {}, this.props.id)
      )
    )
  }
}

class _FaIconWithText extends TR.Component<IconWithTextProps, IconWithTextState> {

  getInitialState() {
    return {
      text: this.props.text
    }
  }

  render() {
    var cn = this.props.className ? this.props.className : '',
      text = this.props.id ? this.props.id : 'N/A';
    return (
      React.createElement('span', {className: 'fa-stack fa-1x ' + cn}, [
          React.createElement('i', {className: 'fa fa-' + this.props.src + ' fa-stack-1x'}),
          React.createElement('strong', {className: 'fa-stack-1x icon-text'}, text)
        ]
      ))
  }
}

/**
 * React component used to make a Font Awesome icon with text inside of it
 * @type {React.ComponentClass<P>}
 */
export var FaIconWithText = TR.createClass(_FaIconWithText);

/**
 * React Component used to create a Font Awesome Icon
 * @type {React.ComponentClass<P>}
 */
export var FaIcon = TR.createClass(_FaIcon);

export var FaToggleIcon = TR.createClass(_FaToggleIcon);
