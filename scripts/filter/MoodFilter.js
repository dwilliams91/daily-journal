import { getMoods, useMoods } from "../JournalDataProvider.js"

const eventHub=document.querySelector(".container")
export const MoodFilter = (allMoods) => {
    
        const radioButtonHTML=`
        <fieldset class="fieldset">
        <legend>Filter Journal Entries by Mood</legend>
        <input type="radio" name="moodFilter" value="0"/>
                    <label for="moodFilter--happy">No filter</label>
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
        return radioButtonHTML
        
}

eventHub.addEventListener("change", e => {
    if (e.target.name === "moodFilter") {
        const filterEvent=new CustomEvent ("selectedMood",{
            detail:{
                moodId:e.target.value

            }
        })
        eventHub.dispatchEvent(filterEvent)
    }
})