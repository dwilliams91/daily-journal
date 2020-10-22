let allEntries=[]
export const getEntries = () => {
    return fetch("http://localhost:8088/entries") // Fetch from the API
        .then(response =>response.json())  // Parse as JSON
        .then(parsedEntries => {
         allEntries=parsedEntries
        })
}

export const useEntries = () => {
    const sortedByDate = allEntries.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}