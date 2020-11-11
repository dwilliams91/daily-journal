import { getMoods, useMoods } from "../JournalDataProvider.js"

const eventHub=document.querySelector(".container")
export const MoodFilter = (allMoods) => {
    
        console.log(allMoods)
        const radioButtonHTML=`
        <fieldset class="fieldset">
        <legend>Filter Journal Entries by Mood</legend>
        ${allMoods.map(
                (mood) => {
                    return `<input type="radio" name="moodFilter" value="${ mood.id }"/>
                    <label for="moodFilter--happy">${ mood.label }</label>
                    `
                }
                ).join("")
            }
            </fieldset>
            `
            console.log(radioButtonHTML)
        return radioButtonHTML
        
}

eventHub.addEventListener("change", e => {
    if (e.target.name === "moodFilter") {

    }
})