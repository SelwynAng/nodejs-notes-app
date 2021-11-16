const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.version = '1.1.0';

//Create an ADD command
yargs.command({
    command: 'add',
    describe: 'Adds a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note contents',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body);
    }
})
//Create a REMOVE command
yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title);
    }
})
//Create a LIST command
yargs.command({
    command: 'list',
    describe: 'Lists out all the availiable notes',
    handler() {
        notes.listNotes();
    }
})
//Create a READ command 
yargs.command({
    command: 'read',
    describe: 'Reads out a specific note.',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title);
    }
})

//Create a REMOVEALL command
yargs.command({
    command: 'removeall',
    describe: 'Removes ALL of the notes',
    handler() {
        notes.removeAll();
    }
})


yargs.parse();