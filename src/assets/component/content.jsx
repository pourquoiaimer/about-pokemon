import { useEffect, useState } from 'react'

import $, { ajax } from 'jquery'
import move_list from '../json/move_list.json'
import my from "../json/my.json"

//部份招式沒辦法播放

function Content(props) {

    if (!my) {
        return null
    }

    const [myData, setMyData] = useState(my)
    const [move_url, setMove_url] = useState("")

    useEffect(() => {
        console.log('test');
    }, [myData])


    function open_or_shot(boolen, event, spc_url) {
        if (boolen) {
            if (event.target.dataset.id == "false") {
                setMove_url(spc_url)
                $('.modal_back').stop().fadeIn();

            } else {
                setMove_url(`https://s1.52poke.wiki/assets/animoves/AniMove${event.target.dataset.id}.gif`)
                $('.modal_back').stop().fadeIn();
            }
        } else {
            $('.modal_back').fadeOut();
        }
    }

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
                let show_data = data.show == "simple" ? data.move : data.move_super
                let move_all = show_data.map(function (data, index) {
                    let now_move
                    for (let index = 0; index < move_list.length; index++) {
                        if (move_list[index].nameZh == data) {
                            now_move = JSON.parse(JSON.stringify(move_list[index]))
                            break
                        }
                    }
                    if (now_move == undefined) {
                        console.log(data);
                        now_move.nameZh == data
                    };

                    switch (true) {
                        case now_move.id < 10:
                            now_move.id = `00${(now_move.id).toString()}`
                            break;
                        case now_move.id < 100:
                            now_move.id = `0${(now_move.id).toString()}`
                            break;
                        case now_move.id > 551:
                            now_move.id = false
                            break;
                        default:
                            now_move.id = (now_move.id).toString()
                            break;
                    }
                    return (
                        <div className='move_' data-id={now_move.id} onClick={(event) => { open_or_shot(true, event, now_move.url) }}>
                            {now_move.nameZh}
                        </div>
                    )
                })

                let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.no}.png`
                // https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/1.gif
                let url_move = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${data.no}.gif`
                let url_super_move = data.no_super ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${data.no_super}.gif` : false

                let url_super = data.no_super ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.no_super}.png` : false
                function superImg(event, url_super) {
                    if (!url_super) {
                        return
                    }
                    let change_data = [...myData]
                    change_data[event.target.dataset.key].show = change_data[event.target.dataset.key].show == "simple" ? "super" : "simple"
                    // setMyData("")
                    setMyData(change_data)
                }
                let bg_color = bg_colors_all[data.type[0]]
                let now_src
                if (props.sprites_show == "simple") {
                    now_src = data.show == "simple" ? url : url_super
                } else {
                    now_src = data.show == "simple" ? url_move : url_super_move
                }

                return (
                    <div className='card_sample' style={{ backgroundColor: bg_color }}>
                        <div className='card_title'>{data.name}</div>
                        <img className={props.sprites_show=="simple"?"img_simple":"img_move"} data-key={index} src={now_src} onClick={(event) => { superImg(event, url_super) }} />
                        {move_all}
                    </div>
                )
            })

            return show

        }

        return (
            <div className='card_all'>
                <Card_show />
            </div>
        )
    }
    return (
        <div id='content' style={{ fontFamily: props.font }}>
            <Card />
            <div className='modal_back' onClick={() => { open_or_shot(false) }}>
                <img className='move_gif' referrer='no-referrer|origin|unsafe-url' src={move_url} />
            </div>
        </div>
    )
}

export default Content
