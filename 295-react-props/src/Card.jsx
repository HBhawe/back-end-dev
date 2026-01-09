import { Avatar } from "./Avatar.jsx";
import { Detail } from "./Detail.jsx";

export function Card({ name, imgSrc, phone, email, id }) {
  return (
    <div className="card">
      <div className="top">
        <Detail text={id} />
        <h2 className="name">{name}</h2>
        <Avatar imgSrc={imgSrc} />
      </div>
      <div className="bottom">
        <Detail text={phone} />
        <Detail text={email} />
      </div>
    </div>
  );
}
