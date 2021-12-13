import 'antd/dist/antd.css';
import './App.css';

import InitialMenuComponent from './Menu Components/InitialMenuComponent';
import UserDetailsContextProvider from './Context/UserDetailsContext';
function App() {
  return (
    <div className="app">
      <UserDetailsContextProvider>
   <InitialMenuComponent/>
   </UserDetailsContextProvider>
    </div>
  );
}

export default App;
