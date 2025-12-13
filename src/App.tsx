import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { WhatsAppButton } from './components/features/WhatsAppButton';
import { AIChatButton } from './components/features/AIChatButton';
import { routes } from './config/routes';
import './styles/App.css';

function App() {
  return (
    <Router>
    <div className="app">
      <Header />
      <main className="main-content">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
      </main>
      <WhatsAppButton />
      <AIChatButton />
    </div>
    </Router>
  );
}

export default App;

