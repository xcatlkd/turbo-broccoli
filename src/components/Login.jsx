import './Login.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return ( 
			<div className="login-page">This is a login page</div>
		)
	}
}

Login.propTypes = {

};

function mapStateToProps(state, props) {
	return {

	}
}

export default connect(mapStateToProps, {})(Login);