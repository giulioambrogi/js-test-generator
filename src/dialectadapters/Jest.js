import beautify from 'js-beautify';
window.beautify = beautify;
let store;

const beauty  = beautify.js_beautify;
let opts = {};
opts.indent_size = 4;
opts.space_in_empty_paren = 12;


function mapChild(child){
    if(child.childNodes().length==0){
        return `it('${child.data().text}', ()=>{

        })\n\n`
    }
    return `describe('${child.data().text}', ()=>{ ${child.childNodes().map(mapChild).join("")}})\n\n`    
}
function print(tree){

    let text = ""
    const root = tree.rootNode();
    text =  mapChild(tree.rootNode())
    return beauty(text, opts);
}

export default {
    print
}
