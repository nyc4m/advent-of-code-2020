import { day1 } from "./day1/main"

const [ts_node, main, day] = process.argv

const days: {[key:string]: ()=>void} = {
    'day1': day1
}

const dayToExecute = days[day]
if(!dayToExecute) {
    console.error(`${day} does not exist`)
    process.exit(1)
}
console.log(`executing ${day}`)
dayToExecute()