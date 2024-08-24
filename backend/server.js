import express from 'express'

const app = express();

// middle to pass json
app.use(express.json())


let notes = [

    { id: 1, title: "The secret", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", reference: "The Secret", date: "20/09/2003" },
    { id: 2, title: "The Compound Effect", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", reference: "The Compound Effect", date: "30/09/2015" },
    { id: 3, title: "Eat That Frog", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", reference: "Eat Frog", date: "15/09/2016" },
    { id: 4, title: "The Power of Now", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", reference: "The power", date: "18/09/2023" },
    { id: 5, title: "Human Nature", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", reference: "Human Nature", date: "26/09/2013" },

]

app.get('', (req, res) => {
    res.status(200).send("Hello Express Js")
})



// get all notes
app.get('/notes', (req, res) => {
    res.status(200).json(notes)
})



// get single note
app.get('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const note = notes.find(note => note.id == id)
    if (!note) {
        res.status(404).send('Note not found')
    }
    res.status(200).json(note)

})



// create note
app.post('/notes', (req, res) => {
    const note = req.body
    if (!note.title || !note.content || !note.reference || !note.date) {
        console.log("incomplete data provided");
        res.status(400).send("In complete data Provided")
    }
    notes.push(note)
    res.status(201).json(notes)
});


// update
app.put('/notes/:id',(req, res)=>{
    const id = parseInt(req.params.id);
    const updatedNote = req.body;
    const noteIndex = notes.findIndex(note=> note.id === id);

    if (!noteIndex) {
        res.status(404).json("Note not found")
    }

    if (!updatedNote.id || !updatedNote.title || !updatedNote.content || !updatedNote.reference || !updatedNote.date) {
        res.status(400).json("Provide all fields")
    }
    
    notes[noteIndex] = updatedNote
    res.status(200).json(notes[noteIndex])
})


// Delete a note
app.delete('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex === -1) {
        return res.status(404).json("Note not found");
    }

    // Remove 1 element at the found index
    notes.splice(noteIndex, 1);
    res.status(200).json(notes);
});



app.listen(3000, () => {
    console.log("App is running");

})