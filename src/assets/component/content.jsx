import { useEffect, useState } from 'react'

import $, { ajax } from 'jquery'

function Content(props) {
    // const [allData, setAllData] = useState([])
    // function getData() {
    //     let url = "https://pokeapi.co/api/v2/pokemon/1"
    //     $.ajax({
    //         url: url, type: 'GET',
    //         success: function (data) {
    //             console.log(data);
    //         },
    //         error:
    //             function (err) {
    //                 console.log(err);
    //             }
    //     });
    // }
    // useEffect(() => {
    //     getData()
    // }, [])


    function Card() {
        function changeText(event) {
            localStorage.setItem('my_data', event.target.value)
        }
        return (
            <div>
                <div>
                    {props.data}
                </div>
                <div>
                <input type="text" defaultValue={props.data} onBlur={(event) => { changeText(event) }} />

                </div>
            </div>
        )
    }
    return (
        <div id='content' style={{ fontFamily: props.font }}>
            <Card />
        </div>
    )
}

export default Content

//  let data = [{ name: "火恐龍", moves: ["鋼爪", "噴射火焰", "火花", "居合斬", "電光一閃"] },  { name: "雷丘", moves: ["電擊", "十萬福特", "電磁波", "鐵尾", "電光一閃"] },{ name: "卡咪龜", moves: ["電擊", "十萬福特", "電磁波", "鐵尾", "電光一閃"] }]