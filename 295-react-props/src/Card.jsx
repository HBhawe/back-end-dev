import { Avatar } from "./Avatar.jsx";
import { Paragraph } from "./Paragraph.jsx";

export function Card({ name, imgSrc, phone, email }) {
  return (
    <div className="card">
      <div className="top">
        <h2 className="name">{name}</h2>
        <Avatar imgSrc={imgSrc} />
      </div>
      <div className="bottom">
        <Paragraph text={phone} />
        <Paragraph text={email} />
      </div>
    </div>
  );
}
