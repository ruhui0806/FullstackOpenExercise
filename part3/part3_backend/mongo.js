//this is an example file that only used to test the connection with mongoDB. 
//no more in use after the backend is connected to the mongoDB. the mongoose model is in ./models/person.js
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://FullStack:${password}@cluster0.iq4mx.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)


// console.log(process.argv)
const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})
//if process.argv.length < 4, then fetch data from the database:
if (process.argv.length < 4) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)})
        mongoose.connection.close()
    })
}
else {
    person.save().then(() => {
        // console.log(result)
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
}
//fetching obj from the database:
// Note.find({important: false}).then(result => {
//     result.forEach(note => {console.log(note)})
//     mongoose.connection.close()
// })

// process.argv.forEach((person) => {
//     console.log(`added ${person.name} number ${person.number} to phonebook`);
//   });

// process.argv[3] = person.name
// process.argv[4] = person.number