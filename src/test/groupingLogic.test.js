
import {group, groupMultiple} from '../components/grouper';

let lines = [
    {text:"prima linea", pad:0},
    {text:"seconda linea", pad:1},
    {text:"terza linea", pad:2},
    {text:"quarta linea", pad:1},
    {text:"quinta linea", pad:2},
]
describe('Given a list of lines', ()=>{

    it('Tree should be built as expected', ()=>{

        const result = group(lines);
        const root = result.rootNode();
        expect(root.data()).toBe(lines[0]);

        expect(root.childNodes().length).toBe(2);
        expect(root.childNodes()[0].data()).toBe(lines[1]);
        expect(root.childNodes()[1].data()).toBe(lines[3]);

        expect(root.childNodes()[0].childNodes().length).toBe(1);

    })

})

describe('When multiple root is present', ()=>{

    it.only('booo', ()=>{

        const data  = [{text:"ciao", pad:0}, {text:"bello", pad:1}, {text:"altro", pad:2}] 
        const result = groupMultiple([data]);
        expect(result.length).toBe(1);
        console.log(result[0]);

    })
})