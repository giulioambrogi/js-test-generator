import dialectadapters from '../dialectadapters/index.js'

//This is the component that generates the code
//Printer is actually a bad name I know

//For the time being the default adapter will be Jest

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

