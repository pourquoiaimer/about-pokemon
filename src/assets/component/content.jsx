import { useEffect, useState } from 'react'

import $, { ajax } from 'jquery'
import move_list from '../json/move_list.json'
import my from "../json/my.json"
import pokemon_list from "../json/pokemon_list.json"
import pokemon_all from "../json/pokemon_all.json"


//分系別也要先有一個陣列
//然後選了多個系別時，先暫存一個陣列，把各個系的先assign，避免有多系別的重複出現
//抓敘述位置參考https://pokeapi.co/api/v2/pokemon-species/1/


function Content(props) {
    const [now_show_type, setNow_show_type] = useState([]) //現在要顯示的全部
    const [now_show_data, setNow_show_data] = useState([])  //現在要顯示的全部

    let data_test = {}
    pokemon_all.map(function (data, index) {
        data_test[data.type_zh] = data
    })

    let type_all = Object.keys(data_test)

    // for (let index = 0; index < type_all.length; index++) {
    //     let pokemon_data = data_test.type_all.pokemon
    //     let pokemon_data_fix = pokemon_data.map(function (data) {

    //     })
    // }

    let color = []
    function Type_option() {

        function type_selcet(e) {
            let type_name = e.target.dataset.keys
            e.target.classList.toggle('click')
            let now_order = now_show_type.indexOf(type_name)
            if (now_order != -1) { //已經有
                now_show_type.splice(now_order, 1)
            } else {
                now_show_type.push(type_name)
            }
            console.log(now_show_type);
        }

        let temp = pokemon_all.map(function (data, index) {
            return (
                <div className='type_option_cell' data-keys={data.type_zh} onClick={(e) => { type_selcet(e) }} >
                    <span className='option_word'>{data.type_zh}</span> <span className='option_num'>{data.pokemon.length}</span>
                </div>
            )
        })

        return (
            <div className='type_option'>

                {temp}
            </div>

        )
    }

    // useEffect(() => {
    //     if (now_show_type.length != 0) {
    //         now_show_type.map(function (data) {
    //             for (let index = 0; index < 18; index++) {
    //                 if (pokemon_all[index].type_zh == data) {
    //                     now_show_data.push
    //                     break

    //                 }
    //             }
    //         })
    //     } else {

    //     }
    // }, [now_show_type])


    function Card_show() {
        const [now_show_num, setNow_show_num] = useState(1)
        if (!now_show_data || now_show_data.length == 0) {
            return null
        }

        function Load_more() {
            return (
                <div className='load_more'>
                    <span onClick={() => {
                        setNow_show_num(now_show_num + 3)
                    }}>查看更多</span>
                </div>
            )
        }

        let pokemon_list_now = pokemon_list.slice(0, now_show_num)
        let card_show_now = pokemon_list_now.map(function (data, index) {
            let bg_color = "white" //後續根據主屬性調整
            // let now_src = `../image/small_img/pokemon${data.index}.png`
            let now_src = `/src/assets/image/small_img/pokemon${data.index}.png`

            //前面應該要加上個編號
            //每50個分一頁
            return (
                <div className='card_sample' key={index}>
                    {/* <img className='img_simple' src={now_src} /> */}
                    <div className='card_title'><span style={{ fontSize: "36px" }}>{data.index}.</span>{data.nameZh}</div>
                </div>
            )
        })
        // console.log(card_show_now);
        return (<>
            {card_show_now}
        </>
        )
    }






    return (
        <div id='content' style={{ fontFamily: props.font }}>
            <Type_option />
            <div className='card_all'>
                <Card_show />
            </div>
        </div>
    )

    // const [myData, setMyData] = useState(my)
    // const [move_url, setMove_url] = useState("")

    // useEffect(() => {
    //     console.log('test');
    // }, [myData])


    // function open_or_shot(boolen, event, spc_url) {
    //     if (boolen) {
    //         if (event.target.dataset.id == "false") {
    //             setMove_url(spc_url)
    //             $('.modal_back').stop().fadeIn();

    //         } else {
    //             setMove_url(`https://s1.52poke.wiki/assets/animoves/AniMove${event.target.dataset.id}.gif`)
    //             $('.modal_back').stop().fadeIn();
    //         }
    //     } else {
    //         $('.modal_back').fadeOut();
    //     }
    // }

    // function TopMenu() {
    //     return (<div id='top_menu'></div>)
    // }

    // function Card() {
    //     function changeText(event) {
    //         localStorage.setItem('my_data', event.target.value)
    //     }
    //     function getData(url, test) {
    //         let url_this = "https://pokeapi.co/api/v2/pokemon/"
    //         $.ajax({
    //             url: url,
    //             type: 'GET',
    //             dataType: 'json',
    //             // contentType: "application/x-www-form-urlencoded",
    //             // jsonpCallback: "callback",
    //             success: function (data) {
    //                 test = data
    //                 console.log(data);
    //             },
    //             error:
    //                 function (err) {
    //                     console.log(err);
    //                 }
    //         });
    //     }

    //     const bg_colors_all = {
    //         fire: "#FDDFDF",
    //         grass: "#DEFDE0",
    //         electric: "#fac000",
    //         water: "#DEF3FD",
    //         ground: "#f4e7da",
    //         rock: "#d5d5d4",
    //         fairy: "#ef70ef",
    //         poison: "#98d7a5",
    //         bug: "#f8d5a3",
    //         dragon: "#97b3e6",
    //         psychic: "#ef4179",
    //         flying: "#81b9ef",
    //         fighting: "#E6E0D4",
    //         normal: "#9fa19f",
    //     }




    //     function Card_show() {
    //         if (myData == "") {
    //             return null
    //         }



    //         let show = myData.map(function (data, index) {
    //             let show_data = data.show == "simple" ? data.move : data.move_super
    //             let move_all = show_data.map(function (data, index) {
    //                 let now_move
    //                 for (let index = 0; index < move_list.length; index++) {
    //                     if (move_list[index].nameZh == data) {
    //                         now_move = JSON.parse(JSON.stringify(move_list[index]))
    //                         break
    //                     }
    //                 }
    //                 if (now_move == undefined) {
    //                     console.log(data);
    //                     now_move.nameZh == data
    //                 };

    //                 switch (true) {
    //                     case now_move.id < 10:
    //                         now_move.id = `00${(now_move.id).toString()}`
    //                         break;
    //                     case now_move.id < 100:
    //                         now_move.id = `0${(now_move.id).toString()}`
    //                         break;
    //                     case now_move.id > 551:
    //                         now_move.id = false
    //                         break;
    //                     default:
    //                         now_move.id = (now_move.id).toString()
    //                         break;
    //                 }
    //                 return (
    //                     <div className='move_' data-id={now_move.id} onClick={(event) => { open_or_shot(true, event, now_move.url) }}>
    //                         {now_move.nameZh}
    //                     </div>
    //                 )
    //             })

    //             let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.no}.png`
    //             // https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/1.gif
    //             let url_move = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${data.no}.gif`
    //             let url_super_move = data.no_super ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${data.no_super}.gif` : false
    //             let url_super = data.no_super ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.no_super}.png` : false

    //             function superImg(event, url_super) {
    //                 if (!url_super) {
    //                     return
    //                 }
    //                 console.log(url_super);

    //                 let change_data = [...myData]
    //                 change_data[event.target.dataset.key].show = change_data[event.target.dataset.key].show == "simple" ? "super" : "simple"
    //                 // setMyData("")
    //                 setMyData(change_data)
    //             }

    //             let bg_color = bg_colors_all[data.type[0]]
    //             let now_src
    //             if (props.sprites_show == "simple") {
    //                 now_src = data.show == "simple" ? url : url_super
    //             } else {
    //                 now_src = data.show == "simple" ? url_move : url_super_move
    //             }

    //             return (
    //                 <div className='card_sample' style={{ backgroundColor: bg_color }}>
    //                     <div className='card_title'>{data.name}</div>
    //                     <img className={props.sprites_show == "simple" ? "img_simple" : "img_move"} data-key={index} src={now_src} onClick={(event) => { superImg(event, url_super) }} />
    //                     {move_all}
    //                 </div>
    //             )
    //         })

    //         return show

    //     }

    //     return (
    //         <div className='card_all'>
    //             <Card_show />
    //         </div>
    //     )
    // }
    // return (
    //     <div id='content' style={{ fontFamily: props.font }}>

    //         <TopMenu />
    //         {/* <Card /> */}
    //         <div className='modal_back' onClick={() => { open_or_shot(false) }}>
    //             <img className='move_gif' referrer='no-referrer|origin|unsafe-url' src={move_url} />
    //         </div>
    //     </div>
    // )
}

export default Content
