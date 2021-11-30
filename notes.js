const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
    const notes = loadNotes(); 
    //Converts string in notes.json file into an array of objects, if JSON file does not exist, it returns []
    const duplicateNote = notes.find((note) => note.title === title);
    //If title passed in already exists, this function returns true and duplicateNote will have a value)    
    if (!duplicateNote) { //If duplicateNote is still null, proceed to push in new note
        notes.push({ //Pushs a new object into the array
            title: title,
            body: body
        });
        saveNotes(notes); //Converts array of objects back into JSON string saved into notes.json file
        console.log(chalk.green('New note added!'));
    } else {
        console.log(chalk.yellow('Note title already taken. Choose another title!'));
    }
}

const removeNotes = (title) => {
    const notes = loadNotes();
    if (notes.length === 0) {
        console.log(chalk.red("There are no availiable notes to remove!"));
    } else {
        const remainingNotes = notes.filter((note) => note.title !== title)
        if (remainingNotes.length === notes.length) {
            console.log(chalk.yellow("Chosen title doesn't exist in database!"));
        } else {
            saveNotes(remainingNotes);
            console.log(chalk.green("Note has been successfully removed!"));
        }
    }
}

const listNotes = () => {
    const notes = loadNotes();
    const noteCount = notes.length;
    console.log(chalk.green.inverse("Number of availiable notes:") + "  " + chalk.green.bold(noteCount));
    notes.forEach((note) => console.log(chalk.magenta(note.title)));
}

const readNotes = (title) => {
    const notes = loadNotes();
    const specificNote = notes.find((note) => note.title === title);
    if (!specificNote) {
        console.log(chalk.red("No such note found!"));
    } else {
        console.log(chalk.cyan.bold(specificNote.title));
        console.log(chalk.blue(specificNote.body));
    }
}

const removeAll = () => {
    const notes= loadNotes();
    if (notes.length === 0) {
        console.log(chalk.yellow("Database is already empty!"));
    } else {
        let i = 0;
        let limit = notes.length;
        while (i < limit) {
            notes.pop();
            i++;
        }
        saveNotes(notes);
        console.log(chalk.red("All notes removed. Database is empty."));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try { //Code in the try block will run, if successful, code will execute normally
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) { //Code in the catch block will run if the code in the try block throws an error
        return []; //Empty array is returned if file does not exist which can be filled with notes if addNotes() is called again
    }
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes,
    removeAll: removeAll
}