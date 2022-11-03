import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext'
import { RecipesContextProvider } from './contexts/RecipesContext';


const root = ReactDOM.createRoot(
		document.getElementById('root') as HTMLElement
);
root.render(
		<React.StrictMode>
				<AuthContextProvider>
					<RecipesContextProvider>
						<App />
					</RecipesContextProvider>
				</AuthContextProvider>
		</React.StrictMode>
);
