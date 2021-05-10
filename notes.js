const fs = require('fs')
const chalk = require('chalk');
const getNotes = () => {
    const notes = loadNotes()
    console.log("Yours Notes")
    notes.forEach(note => {
        console.log(note.title)
    });

}

const readNote = (title) => {
    const notes = loadNotes()
    const singleNote = notes.find((note) => note.title === title)
    console.log(singleNote)
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }
  
}

const removeNote = (title) => {
    const notesJSON = loadNotes()
    const duplicateNotes = notesJSON.filter((note) => note.title !== title )
    
    saveNotes(duplicateNotes)
  
    if(notesJSON.length > duplicateNotes.length){
        console.log(chalk.bgGreen('Note removed'));
    }else {
        console.log(chalk.bgRed('Note not found'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}