/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data provider component
 */
import { useEntries,getEntries, getMoods, useMoods  } from "./JournalDataProvider.js"
import { JournalEntryComponent } from "./JournalEntry.js"

// DOM reference to where all entries will be rendered
const contentTarget = document.querySelector("#entryLog")
const eventHub=document.querySelector(".container")
eventHub.addEventListener("entryStateChange", ()=>EntryList())


export const EntryList = () => {
    getEntries()
    getMoods()
    .then(()=>{
        let allEntries = useEntries()
        let allMoods=useMoods()
        render(allEntries,allMoods)
    })
    
}

const render=(entriesArray,moodArray)=>{
    
    let htmlRepresentation=entriesArray.map(entry=>{
    
    const relatedMood=moodArray.find(mood=>mood.id===parseInt(entry.moodId))
    console.log(relatedMood)
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h3>${entry.concept}</h3>
            <p> ${entry.entry}</p>
            <p>${entry.date}</p>
            <p>${relatedMood.label}</p>
        </section>
    `
    }).join(``)
    console.log(htmlRepresentation)
    contentTarget.innerHTML=htmlRepresentation
}