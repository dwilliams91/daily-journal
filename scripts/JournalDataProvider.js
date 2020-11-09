
const eventHub = document.querySelector(".container")

const dispatchStateChangeEvent = () => {
    const entryStateChangedEvent = new CustomEvent("entryStateChange")
    eventHub.dispatchEvent(entryStateChangedEvent)

}

let allEntries = []
let allMoods=[]
export const getEntries = () => {
    return fetch("http://localhost:8088/entries") // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(parsedEntries => {
            allEntries = parsedEntries
        })
}

export const useEntries = () => {
    const sortedByDate = allEntries.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}

export const getMoods=()=>{
    return fetch ("http://localhost:8088/moods")
    .then(response=>response.json())
    .then(parsedMood=>{
        allMoods=parsedMood
    } )
}
export const useMoods=()=>{
    return allMoods.slice()
}



export const saveEntry = entry => {
    return fetch('http://localhost:8088/entries', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    })
        .then(getEntries)
        .then(dispatchStateChangeEvent)
}

export const deleteEntry=(entryId)=>{
    return fetch(`http://localhost:8088/entries/${entryId}`,{
    method:"delete"
    })
    .then(getEntries)
}

export const updateEntries = (entriesId) => {
    console.log(`http://localhost:8088/entries/${entriesId.id}`)
    return fetch(`http://localhost:8088/entries/${entriesId.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(entriesId)
    })
}