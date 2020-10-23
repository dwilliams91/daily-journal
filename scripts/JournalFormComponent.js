import { saveEntry } from './JournalDataProvider.js'
const contentTarget = document.querySelector(".newEntry")
const eventHub = document.querySelector(".container")

const render = () => {
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
                        <option value="happy">Happy</option>
                        <option value="Sad">Sad</option>
                        <option value="stressed">Stressed</option>
                        <option value="asleep">Asleep</option>
                    </select>
            </fieldset>
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
            mood: mood,
        }
        saveEntry(newEntry)
        render()
    }

})




export const EntryForm = () => {
    render()
}