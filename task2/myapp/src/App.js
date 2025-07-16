import Counter from './component/Counter';
import './App.css';
import Card from './component/Card';

function App() {
  return (
    <div className="App">
      <Counter />
      <div className="card-container" style={{display:"flex;"}} >
      <Card title="First Card" description={"Our first Card"} />
      <Card title="Second Card" description={"Our Second Card"} />
      <Card />
      </div>
    </div>
  );
}

export default App;
