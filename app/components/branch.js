import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import TimeRange from './timeRange.js';

export default class Branch extends React.Component {
    constructor(props) {
        super(props);
        this.handleBranchInputChange = this.handleBranchInputChange.bind(this);
        this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleTimeRangeChange(name, value) {
        this.props.onChange(this.props.emotion, name, value);
    }

    handleBranchInputChange(event) {
        this.props.onChange(this.props.emotion, event.target.name, event.target.value);
    }

    handleToggle() {
        this.props.onChange(this.props.emotion, "enabled", !this.props.value.enabled);
    }

    getOtherLevelIndices() {
        return Array(this.props.numLevels).fill()
                                          .map((_, i) => i+1)
                                          .filter(index => index !== this.props.parentIndex);
    }

    branch() {
        const otherLevelIndices = this.getOtherLevelIndices();
        const branch = this.props.value;

        if (branch.enabled) {
            return (
                <div>
        
                    <TimeRange name="range" range={[branch.start, branch.end]} onChange={this.handleTimeRangeChange}/>

                    <select name="outcome" value={branch.outcome} onChange={this.handleBranchInputChange}>
                        { otherLevelIndices.map((i) => <option value={i}>Level {i}</option>) }
                    </select>
                </div>
            );
        }
        return null;
    }

    render() {
        return(
            <div>
                <h6> {this.props.emotion} Branch </h6>
                <input type="checkbox" name="enabled" bsStyle="primary" bsSize="large" onClick={this.handleToggle}/><span> Disable </span>
                { this.branch() }
            </div>
        );
    }
}