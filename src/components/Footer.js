//Icon made by https://www.flaticon.com/authors/elias-bikbulatov from www.flaticon.com 
import React from 'react'
import styled from 'styled-components'



const Footer = () => (<StyledFooter>
    Copyright <a href="www.giulioambrogi.com">Giulio Ambrogi</a> 2018.
</StyledFooter>)


const StyledFooter = styled.footer`
    background: #ebebeb;
    padding: 40px;
    text-align: center;

    a{
        color: black;
    }
`

export default Footer;