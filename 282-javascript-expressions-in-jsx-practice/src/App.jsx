import "./App.css";

function App() {
  const NAME = `Harshal Bhawe`;
  const YEAR = new Date().getFullYear();

  return (
    <>
      <p>Created by {NAME}</p>
      <p>Copyright {YEAR}</p>
    </>
  );
}

export default App;
