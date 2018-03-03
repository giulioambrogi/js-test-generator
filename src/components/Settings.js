import React,{Component} from 'react';
import styled from 'styled-components';
import formElementStyle from './shared/StyledFormElement'

class Settings extends Component {

    change(event){
        this.props.onChange({negatives:event.target.checked});
    }

    render(){
        return <div>
            <h3>Settings</h3>
            <form>
                    <StyledCheckbox type="checkbox" name="negatives-cb" id="negatives_cb" onChange={(e)=>{this.change(e)}}/>
                    <Label htmlFor="negatives_cb">Generate test failures</Label>
            
            </form>
        </div>
    }

}
const Label = styled.label`
    cursor:pointer;
`
const StyledCheckbox = styled.input`
    cursor:pointer;
    /*box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance:none;
    border: 1px solid #1d1d1d;
    height: 10px;
    width: 10px;
    margin-right: 10px;
    display: inline-block;
    outline: none;

    &:checked{
        background-color:#1d1d1d;
    }*/
`




export default Settings;
