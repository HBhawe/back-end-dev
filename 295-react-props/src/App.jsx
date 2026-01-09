import "./App.css";
import { Card } from "./Card.jsx";
import contacts from "./Contacts.js";

function App() {
  const createCard = function (contact) {
    return (
      <Card
        name={contact.name}
        imgSrc={contact.imgURL}
        phone={contact.phone}
        email={contact.email}
        key={contact.name}
      />
    );
  };

  return (
    <>
      <div>
        <h1 className="heading">My Contacts</h1>
        {contacts.map(createCard)}
      </div>
    </>
  );
}
export default App;
