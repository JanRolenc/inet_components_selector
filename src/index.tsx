import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Selector from './components/selector/selectorComponent'
import './index.css'

ReactDOM.render(
  <Selector required={false} disabled={false} />,
  document.getElementById('root'),
)
