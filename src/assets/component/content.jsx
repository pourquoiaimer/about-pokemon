import { useEffect, useState } from 'react'

import $, { ajax, now } from 'jquery'
import move_list from '../json/move_list.json'
import my from "../json/my.json"
// import pokemon_list from "../json/pokemon_list.json"
import pokemon_all from "../json/pokemon_all.json"
import color_list from "../json/color_list.json"

//分系別也要先有一個陣列
//然後選了多個系別時，先暫存一個陣列，把各個系的先assign，避免有多系別的重複出現
//抓敘述位置參考https://pokeapi.co/api/v2/pokemon-species/1/


function Content(props) {
    const [now_show_type, setNow_show_type] = useState([]) //現在要顯示的全部
    const [now_show_data, setNow_show_data] = useState([])  //現在要顯示的全部
    function Type_option() {

        function type_selcet(e) {
            let type_name = e.target.dataset.keys
            let temp = [...now_show_type]
            // e.target.classList.toggle('click')
            let now_order = now_show_type.indexOf(type_name)
            if (now_order != -1) { //已經有
                temp.splice(now_order, 1)

            } else {
                temp.push(type_name)

                setNow_show_type(temp)
            }

            setNow_show_type(temp)

        }
        let pokemon_keys = Object.keys(pokemon_all)


        let temp = pokemon_keys.map(function (data, index) {
            let title = pokemon_all[data].type_zh
            let num = pokemon_all[data].pokemon.length
            let isClick = now_show_type.indexOf(title) != -1
            return (
                <div className={`type_option_cell ${isClick ? "click" : ""}`} data-keys={title} onClick={(e) => { type_selcet(e) }} >
                    <span className='option_word'>{title}</span> <span className='option_num'>{num}</span>
                </div>
            )
        })

        function type_menu_control_fn(e) {
            $('.type_option').slideToggle("normal", () => {
                if (e.target.textContent == "收起") {
                    e.target.textContent = "打開屬性欄位"
                } else {
                    e.target.textContent = "收起"
                }
            })
        }

        return (
            <>
                <div className='type_option' >
                    {temp}
                </div>
                <div className='type_menu_control' onClick={(e) => { type_menu_control_fn(e) }}>收起</div>
            </>
        )
    }

    useEffect(() => {
        let temp_data = []
        let check_num = {}
        if (now_show_type.length != 0) {
            now_show_type.map(function (data_type) {
                pokemon_all[data_type].pokemon.map(function (data, index) {

                    if (check_num[data.index] == undefined) {
                        check_num[data.index] = 1
                        temp_data.push(data)
                    }
                })
            })

        }
        temp_data.sort(function (a, b) {
            return a.index - b.index; // a - b > 0
        });
        setNow_show_data(temp_data)

    }, [now_show_type])




    function Card_show() {
        let test_num = 1
        if (!now_show_data || now_show_data.length == 0) {
            return null
        }
        const [content, setContent] = useState([])

        useEffect(() => {
            setContent(now_show_data.slice(0, 15))
        }, [])

        const addContent = () => {
            let now_length = content.length == 0 ? 1 : content.length
            setContent(prevContent => [...prevContent, ...(now_show_data.slice(now_length, now_length + 15))]);
        };

        return (
            <>

                <div className='card_all'>
                    {content.map((data, index) => (
                        <div className='card_sample' style={{ backgroundColor: `${color_list[data.type1].color_light}` }} key={index}>
                            <img className='img_simple' src={`./small_img/pokemon${data.index}.png`} />
                            <div className='card_title'><span style={{ fontSize: "36px" }}>{data.index}.</span>{data.nameZh}</div>
                            {data.type2 != "" ?
                                <>
                                    <div className='card_type'>
                                        <span style={{ backgroundColor: `${color_list[data.type1].color}` }} >{data.type1}</span>
                                        <span style={{ backgroundColor: `${color_list[data.type2].color}` }} >{data.type2}</span>
                                    </div>

                                </>
                                :
                                <div className='card_type'><span style={{ backgroundColor: `${color_list[data.type1].color_light}` }}>{data.type1}</span></div>
                            }

                        </div>
                    ))}

                </div>
                {content.length < now_show_data.length && <div className='load_more'>
                    <span onClick={() => {
                        addContent()
                    }}>查看更多</span>
                </div>}
            </>

        )


        // return (<>
        //     {card_show_now}
        // </>
        // )
    }






    return (
        <div id='content' style={{ fontFamily: props.font }}>
            <Type_option />
            <Card_show />
        </div>
    )

}

export default Content
