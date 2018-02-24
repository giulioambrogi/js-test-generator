import {group} from '../components/grouper';
import {print} from '../components/printer';

const lines = [
    {text:"prima linea", pad:0},
    {text:"seconda linea", pad:1},
    {text:"terza linea", pad:2},
    {text:"quarta linea", pad:1},
    {text:"quinta linea", pad:2},
    {text:"sesta linea", pad:2},
]
let tree;
describe('bla', ()=>{

    beforeEach(()=>{
        tree = group(lines);
    })
    it.only('bla', ()=>{
        print(tree);



    })
})