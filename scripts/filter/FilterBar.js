import { getMoods, useMoods } from "../JournalDataProvider.js"
import { MoodFilter } from "./MoodFilter.js"

/*
 You need to make a new HTML element with a class of
 `filters` in index.html
*/

export const FilterBar = () => {
    const contentTarget = document.querySelector(".filters")
    
    const render = (myMoods) => {
        console.log("hello")

        const myHTML=MoodFilter(myMoods)
        console.log(myHTML)
        contentTarget.innerHTML = myHTML
    }
    getMoods()
    .then(()=>{
        const allMoods=useMoods()
    render(allMoods)
    })
}