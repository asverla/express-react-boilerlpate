import React from 'react'
import styles from './styles/main.less'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Header from './containers/Header'

export default class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div id='root' className={styles.root}>
          <Header />
        </div>
      </MuiThemeProvider >
    )
  }
}
