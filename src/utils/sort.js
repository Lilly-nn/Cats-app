export function sortByName(arr, setState, name) {
    setState(arr.filter(el => el.name.toLowerCase().includes(name.toLowerCase())));
}

export function sortDown(arr, field, setState){
    const sortedArr = [...arr].sort((el1, el2) => el2[field] < el1[field] ? 1 : -1 );
    setState(sortedArr)
}

export function sortUp(arr, field, setState){
    const sortedArr = [...arr].sort((el1, el2) => el2[field] > el1[field] ? 1 : -1 );
    setState(sortedArr)
}