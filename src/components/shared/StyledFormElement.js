import styled , { css } from 'styled-components';

export default ()=>{
    return css`
        width:auto;
        border:1px solid #1d1d1d;
        cursor:pointer;
        box-shadow: 2px 2px 1px #1d1d1d;
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        outline: none;
        min-width: 90px;
        border-radius: 1px;
        text-align:left;
        font-family: superfamily;
        font-size: 16px;
        background:#fff;
        -webkit-font-smoothing: antialiased;
        font-smooth: never;

        &:hover{
            border-color:gray;

        box-shadow: 2px 2px 1px gray;
            transition: all 0.8;
        }

        
    `
}