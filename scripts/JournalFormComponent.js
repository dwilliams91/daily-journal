import { getEntries, getMoods, saveEntry, updateEntries, useEntries, useMoods } from './JournalDataProvider.js'
import { EntryList } from './JournalEntryList.js'
const contentTarget = document.querySelector(".newEntry")
const eventHub = document.querySelector(".container")

const render = (moods,inputText) => {
    // console.log("this is what should go in the concept field",inputText)
    contentTarget.innerHTML =
        `
<fieldset>
                <input type="date" name="Date" id="date" value=${inputText.date}>
            </fieldset>
            <fieldset>
                <input type="text" name="concept" id="concept" value="${inputText.concept}">
            </fieldset>
            <fieldset>
                <textarea id=newEntry placeholder=${inputText.entry} value="${inputText.entry}">${inputText.entry}</textarea>
            </fieldset>
            <fieldset>
                    <select name="mood" id="mood">
                    ${moods.map(mood => {
            return `<option value="${mood.id}">${mood.label}</option>
                        `
        })}
                    
                    </select>
            </fieldset>
            <input type="hidden" name="${inputText.id}" id="entryId">

                <button type="submit" id=theButton>Record Journal Entry</button>
`

}

eventHub.addEventListener("click", clickEvent => {

    if (clickEvent.target.id === "theButton") {
        const HiddenId = document.querySelector("#entryId").name
        // console.log(HiddenId)
        if (HiddenId === "entryId") {
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
            // this is putting the values from the dom into the array that gets set to json
        const date = document.querySelector("#date").value
        const concept = document.querySelector("#concept").value
        const entry = document.querySelector("#newEntry").value
        const mood = document.querySelector("#mood").value

        const updateEntry = {
            date: date,
            concept: concept,
            entry: entry,
            moodId: mood,
            id:HiddenId
        }
        // console.log("update this entry", updateEntry.id)
        updateEntries(updateEntry)
            .then(EntryList)
            .then(EntryForm())
            
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
                entry:"Type Entry Text Here",
                moodId:1,
                id:"entryId"

            }
            render(moods,defaultText)
        })

}
// this is the event listener when I edit the an entry
eventHub.addEventListener("editingEntries", event => {
    const entrySelected = event.detail.entryId
    const listOfEntries = useEntries()
    const entryToEdit = listOfEntries.find(entries => entries.id === parseInt(entrySelected))
    // console.log( entryToEdit.id)
    getMoods()
        .then(() => {
            const moods = useMoods()
            render(moods,entryToEdit)

        })



})