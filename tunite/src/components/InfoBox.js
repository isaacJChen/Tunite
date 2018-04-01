import React from "react";

export default class InfoBox extends React.Component{
    render(){
        return(
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.name + ": "} </label>
                <input id={this.props.name} type={this.props.type} className="form-control" placeholder={this.props.placeholder} value={this.props.value} onInput={evt => this.props.inputVal(evt.target.value)} required/>
            </div>
        )
    }
}
