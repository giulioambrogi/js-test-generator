import dialectadapters from '../dialectadapters/index.js'


export function print(adapter, tree, options = {}){
    if(adapter == null || tree == null){
        return "Error";
    }
    const selectedAdapter = dialectadapters[adapter];
    if(selectedAdapter==null){
        throw "Can't find adapter "+adapter
    }
    return dialectadapters[adapter].print(tree, options);
}

