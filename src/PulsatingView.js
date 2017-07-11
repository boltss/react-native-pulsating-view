// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	Animated,
} from 'react-native'

export default class PulsatingView extends Component {

	static propTypes = {
		animate: PropTypes.bool,
		children: PropTypes.node,
		minScale: PropTypes.number,
		maxScale: PropTypes.number,
	}

	static defaultProps = {
		animate: false,
		children: undefined,
		minScale: 0.95,
		maxScale: 1,
	}

	state: {
		pulsateAnimation: Animated.Value,
	}

	constructor(props: Object) {
		super(props)
		this.state = {
			pulsateAnimation: new Animated.Value(props.minScale),
		}
	}

	componentDidMount() {
		if (this.props.animate) {
			this.startAnimation()
		} else {
			this.state.pulsateAnimation.setValue(1)
		}
	}

	componentWillReceiveProps(nextProps: Object) {
		if (!this.props.animate && nextProps.animate) {
			this.startAnimation()
		}
	}

	startAnimation = () => {
		this.animateIn()
	}

	animateIn = () => {
		Animated.timing(this.state.pulsateAnimation, {
			toValue: this.props.maxScale,
			duration: 400,
		}).start(() => {
			if (this.props.animate) {
				this.animateOut()
			}
		})
	}

	animateOut = () => {
		Animated.timing(this.state.pulsateAnimation, {
			toValue: this.props.minScale,
			duration: 600,
		}).start(() => {
			this.animateIn()
		})
	}

	render() {
		const { children } = this.props
		const { pulsateAnimation } = this.state

		const style = {
			transform: [
				{ scale: pulsateAnimation },
			],
		}

		return (
			<Animated.View style={style}>
				{children}
			</Animated.View>
		)
	}
}
