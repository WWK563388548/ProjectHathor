export const createDataTree = dataSet => {
    // 创建一个纯粹的空对象(无 __proto__)
    // {} would instead be equivalent to Object.create(Object.prototype).
    const hashTable = Object.create(null); 
    dataSet.forEach(data => {
        return hashTable[data.id] = {...data, childNodes: []};
    });
    const dataTree = [];
    dataSet.forEach(data => {
        if(data.parentId){
            hashTable[data.parentId].childNodes.push(hashTable[data.id]);
        } else {
            dataTree.push(hashTable[data.id]);
        }
    });

    return dataTree;
};