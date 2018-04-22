import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {searchUser} from './ApiConnector';
import './SearchBox.css';




export class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		
		this.propTypes = {
			label: PropTypes.string,
		};
		this.state = this.getInitialState;
		this.onChange = this.onChange.bind(this);

	  }

	getInitialState () {
		return {
			backspaceRemoves: true,
			multi: true,
			creatable: false,
		};
	}
	onChange (value) {
		this.setState({
			value: value,
		});
	}
	
	getUsers (input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

		return searchUser(input)
		.then(response => {
			return{options: response.data.map(user => {
				return {
					id: user.id,
					label: user.firstName +" "+ user.lastName
				}
			})
		}
		});
		
		
	}
	gotoUser (value, event) {
		window.open('/Employee/' + value.id);
	}
	toggleBackspaceRemoves () {
		this.setState({
			backspaceRemoves: !this.state.backspaceRemoves
		});
	}
	toggleCreatable () {
		this.setState({
			creatable: !this.state.creatable
		});
	}
	render () {
		const AsyncComponent = this.state.creatable
			? Select.AsyncCreatable
			: Select.Async;

		return (
			<div className="section" style={{width: '300px'}} >
				<AsyncComponent 
					multi={this.state.multi} 
					value={this.state.value} 
					onChange={this.gotoUser} 
					onValueClick={this.gotoUser} 
					valueKey="id" 
					labelKey="label"
					loadOptions={this.getUsers} 
					backspaceRemoves={this.state.backspaceRemoves}
					placeholder="Search For An Employee .."
				/>
			</div>
		);
	}
}