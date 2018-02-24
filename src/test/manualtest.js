const grouputils = require('../components/grouper');
const group = grouputils.group;

const lines = [
    {text:"prima linea", pad:0},
    {text:"seconda linea", pad:1},
    {text:"terza linea", pad:2},
    {text:"quarta linea", pad:1},
    {text:"quinta linea", pad:1},
]

const result = grouputils.group(lines)

tree.traverser().traverseDFS(function(node){
    console.log("< Node >  " +node.data());
  });

console.log(grouputils.display())