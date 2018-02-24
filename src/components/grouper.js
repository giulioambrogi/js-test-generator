import dataTree from 'data-tree';

//convertes flat list to tree

function insertNode(node, targetNode = null){
    if(targetNode == null){
        return this.insert(node)
    }
    return this.insertToNode(node, targetNode);
}

function findParentForNextPad(lastInserted,currentPad){
    let cursor = lastInserted; //last inserted
    while(cursor.parentNode() != null && cursor.data().pad >= currentPad){
        cursor = cursor.parentNode();
    }
    return cursor;
}
export function groupMultiple(dataList){
    return dataList.map(group);
}
export function group(data){
    let tree = dataTree.create();

    let lastInserted = null;
    for(let i = 0 ; i < data.length; i++){
        const element = data[i];

        const previousPad = (lastInserted == null) ? null:lastInserted.data().pad

        if(lastInserted == null){
            // console.log(`Inserting root  ${element.text}`)
            
            lastInserted = tree.insert(element);

        }else if(previousPad < element.pad){
            // console.log(`Inserting inner child ${element.text} to element ${lastInserted.data().text}`)
            lastInserted = tree.insertToNode(lastInserted, element);

        }else if(previousPad == element.pad){
            
            const parent = lastInserted.parentNode();
            // console.log(`Inserting child ${element.text} to parent of last one ${parent.data().text}`)
            
            lastInserted = tree.insertToNode(parent, element);

        }else if(previousPad > element.pad){
            const parent = findParentForNextPad(lastInserted, element.pad);
            // console.log(`Inserting child ${element.text} to parent with pad ${parent.data().pad}: ${parent.data().text}`)
            lastInserted = tree.insertToNode(parent, element);
            
        }
        
    }
    

    // const root = tree.insert(data[0]);
    // //console.log("root", root)
    // const child1 = tree.insertToNode(root, {text:"bla", pad:1});
    // //console.log("----1",child1)
    // const child2 = tree.insertToNode(child1, {text:"Basta",pad:2})
    // //console.log("----2",child2._parentNode._parentNode.data())
    // const child3 = tree.insertToNode(child2, {text:".......",pad:3})
    // console.log("----3",child3.parentNode())
    // const toBeInserted = {text:"new", pad:1};

    // let cursor = child3; //last inserted
    // while(cursor.parentNode() != null && cursor.data().pad >= toBeInserted.pad){
    //     console.log(`Op ${cursor.data().pad} vs ${toBeInserted.pad}`)
    //     cursor = cursor.parentNode();
    // }

    // console.log(`Node with pad 1 will be inserted as child of node `, cursor.data())
    // tree.insertToNode(cursor, toBeInserted)


    return tree;
}