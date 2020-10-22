/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data provider component
 */
import { useEntries,getEntries  } from "./JournalDataProvider.js"
import { JournalEntryComponent } from "./JournalEntry.js"

// DOM reference to where all entries will be rendered
const contentTarget = document.querySelector("#entryLog")

export const EntryList = () => {
    getEntries()
    .then(()=>{
        let entries = useEntries()
        render(entries)
    })
    
}

const render=(entriesArray)=>{
    let entriesHTML=""
    for (const entry of entriesArray){
        entriesHTML+=JournalEntryComponent(entry)
    }
    contentTarget.innerHTML=entriesHTML

}