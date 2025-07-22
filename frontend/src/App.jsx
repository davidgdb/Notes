import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import DetailPage from './pages/DetailPage.jsx';
import './App.css';

const App = () => {
  return (
    <div>
      {/*<button className="btn btn-neutral">Neutral</button>*/}
      {/*<button className="btn btn-primary">Primary</button>*/}
      {/*<button className="btn btn-secondary">Secondary</button>*/}
      {/*<button className="btn btn-accent">Accent</button>*/}
      {/*<button className="btn btn-info">Info</button>*/}
      {/*<button className="btn btn-success">Success</button>*/}
      {/*<button className="btn btn-warning">Warning</button>*/}
      {/*<button className="btn btn-error">Error</button>*/}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
