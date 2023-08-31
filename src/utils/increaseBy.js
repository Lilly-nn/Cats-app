export function increaseBy(num, limit, arr) {
    for(let i = num; i <= limit; i += num) {
        arr.push({
            "limit": i
        })
    }
}