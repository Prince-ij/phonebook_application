import { useState, useEffect } from "react";
import personService from "./services/persons";
import "./index.css"

// Components Division

const Header = () => <h2>Phonebook</h2>;

const Notification = ({message, cName}) => {
  return (
    <div className={cName}>
      {message}
    </div>
  )
}

const InputField = ({ text, value, onChange }) => (
  <p>
    {text} <input value={value} onChange={onChange} />
  </p>
);

const Search = ({ title, value, onChange }) => (
  <InputField text={title} value={value} onChange={onChange} />
);

const Person = ({ name, number, onClick }) => (
  <p>
    {name} {number} <button onClick={onClick}>Delete</button>
  </p>
);

const Contacts = ({ header, contacts, onClick }) => {
  return (
    <>
      <h3>{header}</h3>
      {contacts.map((contact) => (
        <Person
          key={contact.name}
          name={contact.name}
          number={contact.number}
          onClick={() => onClick(contact.id)}
        />
      ))}
    </>
  );
};

const AddContactForm = ({ title, onSubmit, inputFields }) => {
  const inputs = inputFields.map((input, index) => {
    return (
      <InputField
        key={index}
        text={input.title}
        value={input.value}
        onChange={input.onChange}
      />
    );
  });

  return (
    <>
      <h3>{title}</h3>
      <form onSubmit={onSubmit}>
        {inputs}
        <button type="submit">add</button>
      </form>
    </>
  );
};

//  Main App

const App = () => {
  // constants and States
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState([]);
  const [msg, setMsg] = useState(null)
  const [classType, setClassType] = useState(null)

  // Fetching the data from json-server
  useEffect(() => {
    personService.getAll().then((initialData) => {
      setPersons(initialData);
    });
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const inputFields = [
    { title: "name: ", value: newName, onChange: handleNewName },
    { title: "number", value: newNumber, onChange: handleNewNumber },
  ];


  const handleSubmit = (e) => {
    e.preventDefault();
    let alreadyIn = false;
    if (persons.some((p) => p.name === newName)) {
      if (confirm(`${newName} already exists, replace number ?`)) {
        const person = persons.find((p) => p.name === newName);
        const newData = { ...person, number: newNumber };
        personService.update(person.id, newData).then((returnedData) => {
          setPersons(
            persons.map((p) => (p.id === person.id ? returnedData : p)),
          );
          setMsg('Number updated successfully ')
          setClassType('success')

          setTimeout(() => {
            setMsg(null)
            setClassType(null)
          }, 5000)
        })
        .catch(err => {
          setMsg(`${person.name} no longer exists`)
          setClassType('error')
          const newPersons = persons.filter((p) => p.id !== person.id);
          setPersons(newPersons);

          setTimeout(() => {
            setMsg(null)
            setClassType(null)
          }, 5000)
        })
        alreadyIn = true;
      }
    } else if (persons.some((p) => p.number === newNumber)) {
      alert(`number already exists in phonebook`);
      alreadyIn = true;
    }
    if (!alreadyIn) {
      const personObject = { name: newName, number: newNumber };
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMsg('New Contact added successfully ')
        setClassType('success')

        setTimeout(() => {
          setMsg(null)
          setClassType(null)
        }, 5000)
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    const person = persons.find((i) => i.id === id);
    if (confirm(`Delete ${person.name} from Phonebook ? `)) {
      personService
        .purge(id)
        .then((response) => {
          const newPersons = persons.filter((person) => person.id !== id);
          setPersons(newPersons);
          setMsg('contact has been successfully deleted')
          setClassType('success')

          setTimeout(() => {
            setMsg(null)
            setClassType(null)
          }, 5000)
        })
        .catch((err) => {
          setMsg(`${person.name} no longer exists`)
          setClassType('error')

          setTimeout(() => {
            setMsg(null)
            setClassType(null)
          }, 5000)
          const newPersons = persons.filter((person) => person.id !== id);
          setPersons(newPersons);
        });
    }
  };

  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filter),
  );

  return (
    <div>
      <Header />
      <Notification cName={classType} message={msg} />
      <Search title="show filter with" value={filter} onChange={handleFilter} />
      <AddContactForm
        title="Add a new Contact"
        onSubmit={handleSubmit}
        inputFields={inputFields}
      />
      <Contacts header="Numbers" contacts={filtered} onClick={handleDelete} />
    </div>
  );
};

export default App;
