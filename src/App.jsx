import { useState } from 'react'
import pika_loading from './assets/image/loading.gif'
import title_pic from "./assets/image/avatar.png"
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
