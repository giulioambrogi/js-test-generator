import beautify from 'js-beautify';
import quotes from '../lib/quotes'

window.beautify = beautify;
let store;

const beauty  = beautify.js_beautify;
let opts = {};
opts.indent_size = 4;
opts.space_in_empty_paren = 12;


function mapChild(child, options = {}){

    const selectedQuote =  quotes[options.quotes] || "'";
    if(child.childNodes().length==0){
        return `it(${selectedQuote}${child.data().text}${selectedQuote}, ()=>{
                ${options.negatives? `throw 'Not Implemented'`: ''}
        })\n\n`
    }
    return `describe(${selectedQuote}${child.data().text}${selectedQuote}, ()=>{\n\n ${child.childNodes().map(mapChild, options).join("")}})\n\n`    
}
function print(tree, options = {}){
    let text = ""
    const root = tree.rootNode();
    text =  mapChild(tree.rootNode(), options)
    return beauty(text, opts);
}

export default {
    print
}
