import { getEntries, getMoods, saveEntry, useEntries, useMoods } from './JournalDataProvider.js'
const contentTarget = document.querySelector(".newEntry")
const eventHub = document.querySelector(".container")

const render = (moods,defaultText) => {
    contentTarget.innerHTML =
        `
<fieldset>
                <input type="date" name="Date" id="date" value=${defaultText.date}>
            </fieldset>
            <fieldset>
                <input type="text" name="concept" id="concept" value=${defaultText.concept}>
            </fieldset>
            <fieldset>
                <textarea id=newEntry placeholder=${defaultText.entry} value=${defaultText.entry}>${defaultText.entry}</textarea>
            </fieldset>
            <fieldset>
                    <select name="mood" id="mood">
                    ${moods.map(mood => {
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
        const id = document.querySelector("#entryId")
        console.log(id)
        if (id === "") {
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
        } else {
            // id value is there, so PUT entry with `updateEntry()`
            // from data provider
        }
       
        
    }

})


export const EntryForm = () => {
    getMoods()
        .then(() => {
            const moods = useMoods()
            const defaultText={
                date:"yyyy-MM-dd",
                concept:"concept",
                entry:"Type Entry Text Here"

            }
            render(moods,defaultText)
        })

}

eventHub.addEventListener("editingEntries", event => {

    const entrySelected = event.detail.entryId
    const listOfEntries = useEntries()
    const entryToEdit = listOfEntries.find(taco => taco.id === parseInt(entrySelected))
    getMoods()
        .then(() => {
            const moods = useMoods()
            render(moods,entryToEdit)

        })



})