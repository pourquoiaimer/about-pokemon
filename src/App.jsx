import { useState } from 'react'
import pika_loading from './assets/image/loading.gif'
import title_pic from "./assets/image/avatar.png"
import Content from './assets/component/content'

import './assets/css/all.scss'
import $ from 'jquery'
import { useEffect } from 'react'

function App() {
  const [font, setFont] = useState("BpmfZihiOnly-R")
  const [allData, setAllData] = useState('')

  let data = ["試試看"]



  useEffect(() => {
    if (localStorage.getItem('my_data') == null) {
      localStorage.setItem('my_data', data)
      setAllData(data)
    }else{
      setAllData(localStorage.getItem('my_data'))
    }
  }, [])


  return (
    <div id="App">
      <div id='header' onClick={() => {
        let change_font = font == "BpmfZihiSans-Regular" ? "BpmfZihiOnly-R" : "BpmfZihiSans-Regular"
        setFont(change_font)
      }}>
        <img className='title_pic' src={title_pic} alt="" />
        {/* <span>Pokemon</span> */}
      </div>
      <Content font={font} data={allData} />
      <div id='footer'>
        <a href="https://www.flaticon.com/free-icons/pikachu" title="pikachu icons">Pikachu icons created by Darius Dan - Flaticon</a>
      </div>
    </div>
  )
}

export default App
