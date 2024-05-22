import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import App from './App';


const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
    <Router>
        <UserProvider>
            <App />
        </UserProvider>
    </Router>
);