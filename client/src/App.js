import React from 'react';
import { useState, useEffect } from 'react';

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true)
  const [minLengthError, setMinLengthError] = useState(false)

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true)
          break;
      }
    }
  }, [value])

  return {
    isEmpty,
    minLengthError,
  }
}

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue)
  const [isDirty, setDirty] = useState(false)
  const valid = useValidation(value, validations)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onBlur = (e) => {
    setDirty(true)
  }

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
}

function App() {
  const email = useInput('', {isEmpty: true, minLength: 3})
  const password = useInput('', {isEmpty: true, minLength: 5})
  
  return (
    <div class='app'>
      <form>
        <h1>Registration</h1>
        {(email.isDirty && email.isEmpty) && <div style={{color:'red'}}>Pole nie morzet byt pustym</div>}
        {(email.isDirty && email.minLengthError) && <div style={{color:'red'}}>Niekorektnaja dlina</div>}
        <input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} value={email.value} name='email' type='text' placeholder='Enter your email...'/>
        <input onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} value={password.value} name='password' type='password' placeholder='Enter your password' />
        <button type='submit'>Registration</button>
      </form>
    </div>
  );
}

export default App;
