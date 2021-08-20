import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './context/context';
import { SpeechProvider } from '@speechly/react-client';

import App from './App';
import './index.css';

ReactDOM.render(
    <SpeechProvider appId='696e8d2a-217c-40d2-810f-46a472f8af7b' language='en-US'>
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>,
    document.getElementById('root')
        
); 