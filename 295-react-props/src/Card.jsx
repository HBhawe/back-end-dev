import Avatar from "./Avatar.jsx";

export function Card({ name, imgSrc, phone, email }) {
  return (
    <div className="card">
      <div className="top">
        <h2 className="name">{name}</h2>
        <Avatar imgSrc={imgSrc} />
      </div>
      <div className="bottom">
        <p className="info">{phone}</p>
        <p className="info">{email}</p>
      </div>
    </div>
  );
}
