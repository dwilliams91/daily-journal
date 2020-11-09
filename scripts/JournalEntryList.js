/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data provider component
 */
import { useEntries,getEntries, getMoods, useMoods, deleteEntry  } from "./JournalDataProvider.js"
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
    // console.log(relatedMood)
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h3>${entry.concept}</h3>
            <p> ${entry.entry}</p>
            <p>${entry.date}</p>
            <p>${relatedMood.label}</p>
            <button id=editEntries--${entry.id}>edit</button>
            <button id=deleteEntries--${entry.id}>delete</button>
        </section>
    `
    }).join(``)
    // console.log(htmlRepresentation)
    contentTarget.innerHTML=htmlRepresentation
}

eventHub.addEventListener("click",click=>{
    if (click.target.id.startsWith("deleteEntries--")){
        const [prefix,id]=click.target.id.split("--")
        
        deleteEntry(id).then(()=>{
            const updateEntries=useEntries()
            const mood=useMoods()
            render(updateEntries,mood)

        })
    }

})
eventHub.addEventListener("click",click=>{
    if (click.target.id.startsWith("editEntries--")){
        const [prefix,id]=click.target.id.split("--")
                const message= new CustomEvent("editingEntries", {
            detail:{
                entryId:id
            }

        })
        eventHub.dispatchEvent(message)
    }

})