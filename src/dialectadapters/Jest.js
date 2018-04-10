import beautify from 'js-beautify';
import quotes from '../lib/quotes'

window.beautify = beautify;
let store;

const beauty  = beautify.js_beautify;
let opts = {};
opts.indent_size = 4;
opts.space_in_empty_paren = 12;

let _options = {}; //printer options (e.g. negatives)

function mapChild(child){

    const selectedQuote =  quotes[_options.quotes] || "'";
    if(child.childNodes().length==0){
        return `it(${selectedQuote}${child.data().text}${selectedQuote}, ()=>{
                ${_options.negatives? `throw 'Not Implemented'`: ''}
        })\n\n`
    }
    return `describe(${selectedQuote}${child.data().text}${selectedQuote}, ()=>{\n\n ${child.childNodes().map(mapChild).join("")}})\n\n`    
}
function print(tree, options = {}){
    _options = options;
    let text = ""
    const root = tree.rootNode();
    text =  mapChild(tree.rootNode())
    return beauty(text, opts);
}

export default {
    print
}
