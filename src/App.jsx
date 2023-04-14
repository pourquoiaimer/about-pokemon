import { useState } from 'react'
import pika_loading from './assets/image/loading.gif'
import title_pic from "./assets/image/pika.png"
import title_pic2 from "./assets/image/snorlax.ico"

import Content from './assets/component/content'

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";

import './assets/css/all.scss'
import $ from 'jquery'
import { useEffect } from 'react'

function App() {
  // const firebaseConfig = {
  //   apiKey: "AIzaSyDN8ajOrHB3GTQtiqtOV5mi3oDIJphn1Ao",
  //   authDomain: "pokemon-test-1baa4.firebaseapp.com",
  //   projectId: "pokemon-test-1baa4",
  //   storageBucket: "pokemon-test-1baa4.appspot.com",
  //   messagingSenderId: "102520562760",
  //   appId: "1:102520562760:web:c5eac975a1250b2220a47d",
  //   measurementId: "G-7Q1MCTYV4R"
  // };
  // const app = initializeApp(firebaseConfig);
  // // const db = getDatabase(app);
  // const dbRef = ref(getDatabase());
  // get(child(dbRef, `my_pokemon`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });




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
      <Content font={font} data={allData} sprites_show={spritesShow}/>

      <div id='footer'>
        <a href="https://www.flaticon.com/free-icons/pikachu" title="pikachu icons">Pikachu icons created by Darius Dan - Flaticon</a>
      </div>
    </div>
  )
}

export default App
