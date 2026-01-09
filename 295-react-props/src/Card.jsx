export function Card({ name, imgSrc, phone, email }) {
	return (
		<div className="card">
			<div className="top">
				<h2 className="name">{name}</h2>
				<img className="circle-img" src={imgSrc} alt="avatar_img" />
			</div>
			<div className="bottom">
				<p className="info">{phone}</p>
				<p className="info">{email}</p>
			</div>
		</div>
	);
}
