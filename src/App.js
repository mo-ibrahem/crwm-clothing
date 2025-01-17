
import {Routes, Route} from 'react-router-dom'
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from "./routes/shop/shop.component"
import Checkout from './routes/checkout/checkout.component';
import { useEffect } from "react";
import { setCurrentUser } from './store/user/user.action';
import { createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
import { onAuthStateChangeListener } from './utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './utils/firebase/firebase.utils';
import { checkUserSession } from './store/user/user.action';
const App = () => {

  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(checkUserSession())
},[])

return(
  <Routes>
    <Route path='/' element={<Navigation/>}>
      <Route index element={<Home/>}/>
      <Route path='shop/*' element={<Shop/>}/>
      <Route path='auth' element={<Authentication/>}/>
      <Route path='checkout' element={<Checkout/>}/>
    </Route>
  </Routes>
    )
    ;
};

export default App;