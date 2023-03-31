import { useEffect, useState } from 'react'

import $, { ajax } from 'jquery'

function Content(props) {
    if (!props.my) {
        return null
    }

    // https://s1.52poke.wiki/wiki/thumb/4/4a/005Charmeleon.png/100px-005Charmeleon.png

    // const [allData, setAllData] = useState([])
    // function getData() {
    //     let url = "https://s1.52poke.wiki/wiki/thumb/9/98/Body09.png/32px-Body09.png"
    //     $.ajax({
    //         url: url,
    //         type: 'GET',
    //         dataType: 'json',
    //         // contentType: "application/x-www-form-urlencoded",
    //         // jsonpCallback: "callback",
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
    const [myData, setMyData] = useState(props.my)

    function Card() {
        function changeText(event) {
            localStorage.setItem('my_data', event.target.value)
        }
        function Card_show() {
            if (myData == "") {
                return null
            }



            let show = myData.map(function (data, index) {
                let move_all = data.move.map(function(data,index){
                    return (
                        <div className='move_'>{data}</div>
                    )
                })
                console.log(data.no);
                // let url =`https://s1.52poke.wiki/wiki/thumb/4/4a/${data.no}${data.nameEn}.png/100px-${data.no}${data.nameEn}.png`
                let url = data.url
                return (
                    <div className='card_sample'>
                        <div className='card_title'>{data.name}</div>
                        <img src={url} />
                        {move_all}
                    </div>
                )
            })
            console.log(show);
            return show

        }

        return (
            <div className='card_all'>
                <div>
                    <Card_show />
                    {/* <input type="text" defaultValue={props.data} onBlur={(event) => { changeText(event) }} /> */}
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