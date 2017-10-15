import React, { Component } from 'react';
import './LabelText.css';

function getPadding(numberOfTies){
var strokeSize = 10;
var initialPadding = 5;
var padding = initialPadding + strokeSize*((numberOfTies-1)/2);
return padding +"px 0";
}

function convertToKebabCase(string){
  return string.replace(/\s+/g, '-').toLowerCase();
}

class LabelText extends Component {
  labelTextStyle(props){
  return{
    padding: getPadding(this.props.item.numberOfTies)
  };
}
  render() {
    return (
        <label id={convertToKebabCase(this.props.item.name)} className={this.props.childClass} style={this.labelTextStyle()}>{this.props.item.name}</label>
    );
  }
}

export default LabelText;
