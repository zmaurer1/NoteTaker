const fs = require("fs")
const util = require("util")
const uuidv1= require("uuid/v1")
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Store {
    read(){
        return readFileAsync("db/db.json", "utf8")
        
    }
    write(note){
        return writeFileAsync("db/db.josn", JSON.stringify(note))
        
    }
    getNotes(){
        return this.read().then((notes) => {
            let parcedNotes;
            try{
                parcedNotes = [].concat(JSON.parse(notes))
            }catch(err){
                parcedNotes = []
            }
            return parcedNotes
        })
    }
    addNote(note){
        const{title, text} = note
    if(!title ||!text){
        throw new Error("Notes require a title and text, weirdo")
    }
const newNote ={ title, text, id: uuidv1()}
     return this.getNotes().then((notes) => [...notes, newNote] 
).then((updatedNotes) => this.write(updatedNotes)).then(() => newNote )}
removeNote(id){
    return this.getNotes().then((notes) => notes.filter((note) => note.id!==id)).then((filteredNotes) => this.write(filterNotes))
}
}
module.exports = new Store()


