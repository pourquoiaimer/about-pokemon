import { useState } from 'react'
import pika_loading from './assets/image/loading.gif'
import title_pic from "./assets/image/pika.png"
import title_pic2 from "./assets/image/snorlax.ico"

import Content_xiang from './assets/component/content_xiang'
import Content from './assets/component/content'


import './assets/css/all.scss'
import $ from 'jquery'
import { useEffect } from 'react'

function App() {

  const [nowShow, setNowShow] = useState("content")

  const [font, setFont] = useState("BpmfZihiOnly-R")
  const [spritesShow, setSpritesShow] = useState("simple")

  const [allData, setAllData] = useState('')

  let data = ["試試看"]



  useEffect(() => {
    if (localStorage.getItem('my_data') == null) {
      localStorage.setItem('my_data', data)
      setAllData(data)
    } else {
      setAllData(localStorage.getItem('my_data'))
    }
  }, [])



  return (
    <div id="App">
      <div id='header'>
        <img className='title_pic' src={title_pic} alt="" onClick={() => {
          let change_font = font == "BpmfZihiSans-Regular" ? "BpmfZihiOnly-R" : "BpmfZihiSans-Regular"
          setFont(change_font)
        }} />
        <img className='title_pic2' src={title_pic2} alt="" onClick={() => {
          let change_sprites_show = spritesShow == "simple" ? "move" : "simple"
          setSpritesShow(change_sprites_show)
        }}/>

        {/* <span>Pokemon</span> */}
      </div>
      {nowShow=="content"?<Content font={font} data={allData} sprites_show={spritesShow}/>:<Content_xiang font={font} data={allData} sprites_show={spritesShow}/>}
      

      <div id='footer'>
        <a href="https://www.flaticon.com/free-icons/pikachu" title="pikachu icons">Pikachu icons created by Darius Dan - Flaticon</a>
      </div>
    </div>
  )
}

export default App
