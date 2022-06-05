import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom"

import App from './App';
import ChatProvider from './Context/ChatProvider';


//whatever state we create in our context API it will be accessible to whole of our app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <BrowserRouter>

      <ChatProvider>
        <App />
      </ChatProvider>

    </BrowserRouter>
  </ChakraProvider>
);

