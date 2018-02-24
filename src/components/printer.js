import beautify from 'js-beautify';
window.beautify = beautify;
let store;

const beauty  = beautify.js_beautify;
let opts = {};
opts.indent_size = 4;
opts.space_in_empty_paren = 12;


function mapChild(child){
    if(child.childNodes().length==0){
        return `\n\nit('${child.data().text}', ()=>{

        })\n\n`
    }
    return `describe('${child.data().text}', ()=>{ ${child.childNodes().map(mapChild).join("")}})`    
}
export function print(tree){

    let text = ""
    const root = tree.rootNode();
    text =  mapChild(tree.rootNode())
    return beauty(text, opts);
}


//TODO remove
function print_old(tree){
    store = [];
    test(tree.rootNode(), "");
    
    return store.join("\n");
}

function test(node, currentString){
    currentString += (currentString==""?"":" > ")+ node.data().text;

    if(node.childNodes().length ==0 ){
        store.push(currentString);
        console.log(currentString);
    }

    node.childNodes().forEach(c=>{

        return test(c, currentString);
    })

}