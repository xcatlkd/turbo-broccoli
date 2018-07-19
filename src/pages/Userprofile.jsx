import './Userprofile.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class UserProfile extends Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return ( 
			<div className="user-profile-page">Welcome back!</div>
		)
	}
}

UserProfile.propTypes = {

};

function mapStateToProps(state, props) {
	return {

	}
}

export default connect(mapStateToProps, {})(UserProfile);