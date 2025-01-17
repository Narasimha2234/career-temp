import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import reportWebVitals from "./reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox";
import { SnackbarProvider } from 'notistack';

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
	<React.StrictMode>
		<Provider store = {store}>
            <SimpleReactLightbox>
                <BrowserRouter basename='/orchasp/careers'>
                <SnackbarProvider autoHideDuration={3000} maxSnack={1} anchorOrigin={{vertical:"top",horizontal:"center"}}>
                    <App />
                </SnackbarProvider>
                </BrowserRouter>    
            </SimpleReactLightbox>
        </Provider>	
	</React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
