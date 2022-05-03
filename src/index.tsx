import * as ReactDOM from 'react-dom'
import PersonsSelect from './PersonsSelect/PersonsSelect'
import './index.css'

ReactDOM.render(
  <PersonsSelect
    name="pers"
    required={false}
    disabled={false}
    selectAll={true} //výhledově dle přiřezených práv uživatele bude mít uživatel u tohoto true/false a tedy možnost pracovat i s nezařazenými
    selectedId={2}
    myId={11}
  />,
  document.getElementById('root'),
)
