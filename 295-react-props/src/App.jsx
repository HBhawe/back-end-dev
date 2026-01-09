import "./App.css";
import { Card } from "./Card.jsx";
import contacts from "./Contacts.js";

function App() {
  return (
    <>
      <div>
        <h1 className="heading">My Contacts</h1>
        {contacts.map((contact) => {
          return (
            <Card
              name={contact.name}
              imgSrc={contact.imgURL}
              phone={contact.phone}
              email={contact.email}
              key={contact.name}
            />
          );
        })}
      </div>
    </>
  );
}
export default App;
