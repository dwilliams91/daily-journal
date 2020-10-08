export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h3>${entry.concept}</h3>
            <p> ${entry.entry}</p>
            <p>${entry.date}</p>
        </section>
    `
}
