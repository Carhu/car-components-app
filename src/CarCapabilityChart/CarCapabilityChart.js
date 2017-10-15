import React, { Component } from 'react';
import './CarCapabilityChart.css';
import carDataSet from './CarDataSet.json';
import _ from 'lodash';
import LabelText from './Label/LabelText.js';
import Connector from './Connector/Connector.js';

function sortDataByValueLength(data){
var sorted = Object.keys(data)
  .map(function(k) { return { key: k, value: data[k] }; })
  .sort(function(a, b) { return b.value.length - a.value.length; });
  return sorted;
}

function getNumberOfVehicleTies(vehiclesArr,vehicle){
	return vehiclesArr.reduce((count, item)=>{
  		if(item === vehicle){
  			return count + 1;
  		}
  		return count;
  	},0);
}

function getVehicles(components){
	var vehiclesArr = _.flatMap(components, (component) =>{
    		return component.value;
    	});

    var uniqueVehicles = vehiclesArr.filter(function(item, pos){
  			return vehiclesArr.indexOf(item) === pos; 
	});

  var vehicles = uniqueVehicles.map((vehicle)=>{
  	var count = getNumberOfVehicleTies(vehiclesArr, vehicle);
  	return{
  		numberOfTies: count,
  		name: vehicle,
  		countTies: 0
  	};
  })

const sortedVehicles = _.sortBy(vehicles, 'numberOfTies').reverse();
return sortedVehicles;
}

function getComponents(components){
	return components.map((component) => {
  		return {
  			numberOfTies: component.value.length,
  			name: component.key
  		};
  	});
}

function getSortingIdxsOfVehicles(vehiclesAndTies, vehicle){
	var endingIdxs = [];
	vehiclesAndTies.forEach((v) =>{
    				if(v.name === vehicle){
    					endingIdxs.push(_.clone(v.countTies));
    					v.countTies ++;
    				}
    			});
	return endingIdxs;
}

class CarCapabilityChart extends Component {
    constructor(){
    	super();
    	var data = JSON.parse(JSON.stringify(carDataSet))
    	var sortedComponents = sortDataByValueLength(data);
    	
    	const vehicles = getVehicles(sortedComponents);
    	const components = getComponents(sortedComponents);

    	this.state = {
    		'vehicles': vehicles,
    		'components': components,
    		'componentsAndVehicles': sortedComponents,
    		'drawConnectors': false
    	};
    }
    showLabels(labelItems, childClass){
    	return labelItems.map((item)=>{
    		return (
    			<LabelText key={item.name} item={item} childClass={childClass}></LabelText>
    			);
    	});
    }
    showConnectors(){
    	var connectors =[];
    	var vehiclesAndTies = _.cloneDeep(this.state.vehicles);

    	if(this.state.drawConnectors){
    		this.state.componentsAndVehicles.forEach((item,itemIdx)=>{
	    		var component = item.key;
	    		var vehicles = item.value;
	    		vehicles.forEach((vehicle,vehicleIdx)=>{
    				var endingIdxs = getSortingIdxsOfVehicles(vehiclesAndTies, vehicle);

    				connectors.push(
    					<Connector key={"connector"+itemIdx+"-"+vehicleIdx}
    					startingLabel={component} endingLabel={vehicle}
    					startingIdx={vehicleIdx} endingIdx={endingIdxs[endingIdxs.length-1]}>
    					</Connector>);
    				});
    			return connectors;
    		});
    	}

    	return connectors;
    }
    componentDidMount(){
    	this.setState({
    		'vehicles': this.state.vehicles,
    		'components': this.state.components,
    		'componentsAndVehicles': this.state.componentsAndVehicles,
    		'drawConnectors': true
    	});
    }
  render() {
    return (
      <div className="CarCapabilityChart">
      <div className="components">
      	{this.showLabels(this.state.components, "componentText")}
      </div>
      <svg className="connectors">
      	{this.showConnectors()}
      </svg>
      <div className="vehicles">
      	{this.showLabels(this.state.vehicles, "vehicleText")}
      </div>
      </div>
    );
  }
}

export default CarCapabilityChart;
