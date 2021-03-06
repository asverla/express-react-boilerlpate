import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import draweractions from '../actions/draweractions'
import FlatButton from 'material-ui/FlatButton'
// Importing CSS modules
import styles from '../styles/components/header.less'

/**
 * Notice that the class is exported as a non-default named export to improve testability. This allows you to test invocation of functions
 * on user interactions.
 *
 * For example: To test invocation of `justSomeInternalFunction` and `justSomeFunctionOnProps` we export the component as named export.
 * @see {@link ../tests/containers/Header.spec.js}
 * @since 0.0.1
 */
export class Header extends Component {
  /**
   * A dummy internal function to demonstrate unit testing of functions internal to React components.
   */
  justSomeInternalFunction () {
    console.log('justSomeInternalFunction():: Was called')
  }

  justSomeInternalFunctionThatReturnsSomething () {
    return {
      what: 'returnvalue'
    }
  }

  justSomeInternalFunctionThatCallsOtherInternalFunction () {
    this.justSomeInternalFunction()
  }

  functionGetsCalledFromComponentDidMount () {
    // console.log('functionGetsCalledFromComponentDidMount()::Got called from componentDidMount()')
  }

  whenMagicHandler (event) {
    // Perform magic here, test it in isolation
  }

  onDanceHandler (event) {
    // Dance here, test it in isolation
  }

  /**
   * In order to make this function unit testable and atomic, only consider calling other functions in lifecycle methods.
   * Avoid use of conditions and logic in this method, and transfer logic into instance functions as shown in this example.
   */
  componentDidMount () {
    this.functionGetsCalledFromComponentDidMount()
    // In case you want to register DOM events, do them like such.
    // window.addEventListener('onDance', this.onDanceHandler)
  }

  componentWillUnmount () {
    // Unregister DOM events when component unmounts
    // window.removeEventListener('onDance', this.onDanceHandler)
  }

  render () {
    return (
      <div id='header'>
        <AppBar id='appBar' title='Express React Boilerplate' className={styles.header} onLeftIconButtonClick={() => this.props.toggleDrawer()} />
        <Drawer id='drawer' open={this.props.isOpen} docked={false} onRequestChange={() => this.props.toggleDrawer()} className={styles.header}>
          <MenuItem><Link to='/'>Home</Link></MenuItem>
          <MenuItem><Link to='/about'>About</Link></MenuItem>
          <MenuItem><Link to='/demo'>Demo</Link></MenuItem>
        </Drawer>
        {/* Pay attention to the events `onClick` and `whenMagic`. `Header.spec.js` demonstrates us of enzyme to dispatch custom and well known events */}
        {/* React's Synthetic events is all you would need in most cases. These are examples only to demonstrate a key concept of enzyme */}
        <FlatButton id='button' label='Toggle Drawer' onClick={() => this.props.toggleDrawer()} whenMagic={() => this.whenMagicHandler()} onDance={() => this.onDanceHandler()} primary />
      </div>
    )
  }
}

/**
 * When testing a Higher Order Component (HOC) esp. redux connected component you should test the following:
 * 1. The existence of the particular `props` on the component.
 * 2. Simulate different values of the `prop` and validate the shallow rendering of your component, typically snapshotting it. (use `enzyme.setProps()` and `enzyme.update()` to
 * update and re-render your component, it will call `componentWillReceiveProps` lifecycle method.)
 * 3. Existing of CSS classes on the elements in the render tree of this component.
 *
 * Note that, it is not necessary to test and validate full rendering of child compoments since those tests belong to the tests for the
 * child component separately.
 * @param {*} state the current state of the application
 */
const mapStateToProps = (state) => {
  return {
    isOpen: state.drawer.isOpen
  }
}
/**
 * In your tests, you should only test the existing of the functions on `this.props` object. Testing the invocation of this function
 * when you are testing the Higher Order Compoent (in this case `<Connect />`) will be equivalent to testing react-redux, avoid that.
 * In order to test the invocation of the function see the comments on this file's definition.
 * @param {*} dispatch dispatch middleware from redux.
 */
const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawer: () => dispatch(draweractions.toggleDrawer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
