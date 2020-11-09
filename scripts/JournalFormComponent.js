import { getEntries, getMoods, saveEntry, useEntries, useMoods } from './JournalDataProvider.js'
const contentTarget = document.querySelector(".newEntry")
const eventHub = document.querySelector(".container")

const render = (moods) => {
    contentTarget.innerHTML =
        `
<fieldset>
                <input type="date" name="Date" id="date">
            </fieldset>
            <fieldset>
                <input type="text" name="concept" id="concept" placeholder="concept">
            </fieldset>
            <fieldset>
                <textarea id=newEntry placeholder="Type new Entry Here"></textarea>
            </fieldset>
            <fieldset>
                    <select name="mood" id="mood">
                    ${moods.map(mood=>{
                        return `<option value=${mood.id}>${mood.label}</option>
                        `
                    })}
                    
                    </select>
            </fieldset>
            <input type="hidden" name="entryId" id="entryId">

                <button type="submit" id=theButton>Record Journal Entry</button>
`

}

eventHub.addEventListener("click", clickEvent => {

    if (clickEvent.target.id === "theButton") {
        const date = document.querySelector("#date").value
        const concept = document.querySelector("#concept").value
        const entry = document.querySelector("#newEntry").value
        const mood = document.querySelector("#mood").value

        const newEntry = {
            date: date,
            concept: concept,
            entry: entry,
            moodId: mood,
        }
        saveEntry(newEntry)

        EntryForm()
    }

})

export const EntryForm = () => {
    getMoods()
    .then(()=>{
        const moods=useMoods()
        render(moods)
    })
    
}

eventHub.addEventListener("editingEntries", event =>{
    
    console.log(event.detail.entryId)
    
} )