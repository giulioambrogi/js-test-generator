import React, {Component} from 'react';
import styled , { css } from 'styled-components';

const MainContentStyled =  styled.div`
        max-width:1200px;
        margin:0 auto;
    `

class MainContent extends Component {

        render(){
            return <MainContentStyled>
                {this.props.children}   
            </MainContentStyled>
        }
}
export default MainContent