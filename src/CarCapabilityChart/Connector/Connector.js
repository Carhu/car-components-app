import React, { Component } from 'react';
import './Connector.css';


function convertToKebabCase(string){
  return string.replace(/\s+/g, '-').toLowerCase();
}

function getPath(props){
var startingLabel = props.startingLabel;
var endingLabel = props.endingLabel;
var startingIdx = props.startingIdx;
var endingIdx = props.endingIdx;
var strokeWidth = 10;
var horizontalPadding = 5;
var padding = 20;
var listItemsPadding = 5;

var startingElement = document.querySelector("#"+convertToKebabCase(startingLabel)).getBoundingClientRect();
var endingElement = document.querySelector("#"+convertToKebabCase(endingLabel)).getBoundingClientRect();

var componentsParentPos = document.querySelector(".components").getBoundingClientRect();
var vehiclesParentPos = document.querySelector(".vehicles").getBoundingClientRect();

var startingElPosTop = startingElement.top - componentsParentPos.top - padding;
var endingElPosTop = endingElement.top - vehiclesParentPos.top - padding;

var posComponent = {
    x: horizontalPadding,
    y: startingElPosTop  + (startingIdx+1)*strokeWidth + listItemsPadding
  };
  var posVehicle = {
    x: 700 - horizontalPadding,
    y: endingElPosTop  + (endingIdx+1)*strokeWidth + listItemsPadding
  };
 var dStr =
      "M" +
      (posComponent.x      ) + "," + (posComponent.y) + " " +
      "C" +
      (posComponent.x + 100) + "," + (posComponent.y) + " " +
      (posVehicle.x - 100) + "," + (posVehicle.y) + " " +
      (posVehicle.x      ) + "," + (posVehicle.y);

      return dStr;

}
function styleTextElement(element, style){
	element.style.fontWeight = style.fontWeight;
	element.style.color = style.color;
}
function stylePathElement(element, style){
	element.setAttribute("stroke",style.color);
}

function styleElements(_self, style){
	var startingElement = document.querySelector("#"+convertToKebabCase(_self.props.startingLabel));
var endingElement = document.querySelector("#"+convertToKebabCase(_self.props.endingLabel));
var connectorElement = _self.refs.connector;
styleTextElement(startingElement, style);
styleTextElement(endingElement,style);
stylePathElement(connectorElement,style);
}

class Connector extends Component {
	onMouseover(_self){
		var style ={
			color: "black",
			fontWeight:"bold"
		};
		styleElements(_self, style);
	}
		onMouseleave(_self){
			var style ={
				color: "#d6d6d6",
				fontWeight:"normal"
			};
			styleElements(_self, style);
	}
	render() {
		return (
			<path ref="connector" d={getPath(this.props)}
			 id={convertToKebabCase(this.props.startingLabel+" "+this.props.endingLabel)}
			 fill="none" stroke="#d6d6d6" strokeWidth="10" 
			 onMouseOver={() =>{this.onMouseover(this)}} onMouseLeave={() =>{this.onMouseleave(this)}}/>
			 );
	}
}

export default Connector;
