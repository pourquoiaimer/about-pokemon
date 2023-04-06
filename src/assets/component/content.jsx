import { useEffect, useState } from 'react'

import $, { ajax } from 'jquery'

function Content(props) {
    if (!props.my) {
        return null
    }

    const [myData, setMyData] = useState(props.my)

    function Card() {
        function changeText(event) {
            localStorage.setItem('my_data', event.target.value)
        }
        function getData(url, test) {
            let url_this = "https://pokeapi.co/api/v2/pokemon/"
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                // contentType: "application/x-www-form-urlencoded",
                // jsonpCallback: "callback",
                success: function (data) {
                    test = data
                    console.log(data);
                },
                error:
                    function (err) {
                        console.log(err);
                    }
            });
        }

        const bg_colors_all = {
            fire: "#FDDFDF",
            grass: "#DEFDE0",
            electric: "#fac000",
            water: "#DEF3FD",
            ground: "#f4e7da",
            rock: "#d5d5d4",
            fairy: "#ef70ef",
            poison: "#98d7a5",
            bug: "#f8d5a3",
            dragon: "#97b3e6",
            psychic: "#ef4179",
            flying: "#81b9ef",
            fighting: "#E6E0D4",
            normal: "#9fa19f",
        } 


        function Card_show() {
            if (myData == "") {
                return null
            }


            let show = myData.map(function (data, index) {
                let move_all = data.move.map(function (data, index) {
                    return (
                        <div className='move_'>{data}</div>
                    )
                })

                let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.no}.png`
                let url_super = data.no_super ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.no_super}.png` : false
                function superImg(event, url_super) {
                    if (!url_super) {
                        return
                    }
                    if (event.target.src == url) {
                        event.target.src = url_super
                    } else {
                        event.target.src = url
                    }
                }
                let bg_color = bg_colors_all[data.type[0]]
                console.log(bg_color);
                return (
                    <div className='card_sample' style={{backgroundColor:bg_color}}>
                        <div className='card_title'>{data.name}</div>
                        <img src={url} onClick={(event) => { superImg(event, url_super) }} />
                        {move_all}
                    </div>
                )
            })

            return show

        }

        return (
            <div className='card_all'>
                {/* <div> */}
                <Card_show />
                {/* <input type="text" defaultValue={props.data} onBlur={(event) => { changeText(event) }} /> */}
                {/* </div> */}
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