import './Home.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Home extends Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return ( 
			<h1 className="home-page">Welcome to Turbo-Broccoli</h1>
		)
	}
}

Home.propTypes = {

};

function mapStateToProps(state, props) {
	return {

	}
}

export default connect(mapStateToProps, {})(Home);