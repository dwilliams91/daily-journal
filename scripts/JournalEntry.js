import { useEntries } from "./JournalDataProvider.js"

export const JournalEntryComponent = (entry,mood) => {
    
    return entry.map(entry=>{
        const relatedMood=mood.find(mood=>mood.id===entry.moodId)
    
     `
        <section id="entry--${entry.id}" class="journalEntry">
            <h3>${entry.concept}</h3>
            <p> ${entry.entry}</p>
            <p>${entry.date}</p>
            <p>${relatedMood.label}</p>
        </section>
    `
})
}
