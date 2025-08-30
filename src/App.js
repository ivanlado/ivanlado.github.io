import './App.css';
import Header from "./components/Header";
import Home from "./pages/Home";
import data from "./assets/data.json";



function App() {
  return (
    <div>
      <Header data={data}/>
      <Home data={data}/>
    </div>
  );
}

export default App;
