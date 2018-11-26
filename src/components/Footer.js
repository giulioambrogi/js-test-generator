//Icon made by https://www.flaticon.com/authors/elias-bikbulatov from www.flaticon.com 
import React from 'react'
import styled from 'styled-components'



const Footer = () => (<StyledFooter>
    <p>Copyright <a href="www.giulioambrogi.com">Giulio Ambrogi</a> 2018.</p>
    <SmallNote>Copy icon made by <a href="https://www.flaticon.com/authors/elias-bikbulatov">Elias Bikbulatov</a> from www.flaticon.com.</SmallNote>
</StyledFooter>)

const SmallNote = styled.p`
  font-size: 10px;
`
const StyledFooter = styled.footer`
    background: #ebebeb;
    padding: 40px;
    text-align: center;

    a{
        color: black;
    }
`

export default Footer;
