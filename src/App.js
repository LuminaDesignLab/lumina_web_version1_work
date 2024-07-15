import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

function Header() {
  return (
    <header className="navbar_container">
      <div className="navbar_box">
        <div className="navbar_logo_container">
          <span className="navbar_logo_title">LUMINA </span>
          <span className="navbar_logo_subtext">Design Lab</span>
        </div>
        <ul className="navbar_items">
          <li className="navbar_item">Home</li>
          <li className="navbar_item">About</li>
          <li className="navbar_item">Contact</li>
        </ul>
        <div className="red_bubble">
          <span>무료상담</span>
        </div>
      </div>
    </header>
  );
}

export default App;
