import React from 'react';
import ReactDOM from 'react-dom';
import Select from "../component/select/select";

ReactDOM.render(
    <Select changeState={
        function changeState(ev){
            console.log(ev.target.value);
        }
    } options={
        [{name:'第一个',value:1},{name:'第二个',value:2},{name:'第三个',value:3}]
    }/>
    , document.getElementById('__select__'));