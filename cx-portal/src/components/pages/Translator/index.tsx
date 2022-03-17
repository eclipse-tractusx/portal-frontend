import axios from 'axios'
import { useState } from 'react'
import Dropzone from './Dropzone'
import './Translator.css'

export default function Translator() {
  const [input, setInput] = useState('{"message":"Guten Morgen!"}')
  const [output, setOutput] = useState('')
  const [langFrom, setLangFrom] = useState('de')
  const [langTo, setLangTo] = useState('en,bg')

  function doTranslate() {
    const url = `${process.env.REACT_APP_BASE_UTIL}/translate/${langFrom}/${langTo}`
    axios
      .post(url, input)
      .then(function (response) {
        console.log(response)
        console.log(response.data.result)
        setOutput(JSON.stringify(response.data.result, null, 4))
      })
      .catch(function (error) {
        console.log(error)
        setOutput(error)
      })
  }

  return (
    <main className="Translator">
      <h2>Translator</h2>
      <Dropzone />
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <textarea defaultValue={output} />
      <input type="button" value="translate" onClick={() => doTranslate()} />
      from{' '}
      <input
        placeholder="from"
        value={langFrom}
        onChange={(e) => setLangFrom(e.target.value)}
      />
      to{' '}
      <input
        placeholder="to"
        value={langTo}
        onChange={(e) => setLangTo(e.target.value)}
      />
    </main>
  )
}
