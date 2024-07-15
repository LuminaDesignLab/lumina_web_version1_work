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
      <div className="navbar_items">
        <div className="navbar_logo_container">
          <span className="navbar_logo_title">루미나LUMINA </span>
          <span className="navbar_logo_subtext">DesignLab</span>
        </div>
      </div>
    </header>
  );
}

export default App;
