import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css//HeroCard.css'
import { CryptoDetails } from './commonComponent/CryptoDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CryptoViewData } from './commonComponent/CryptoViewData';
import { MainPage } from './commonComponent/MainPage';
import DemoTableData from "./commonComponent/DemoTableData"

export const App = () => {



  return (
    <>
      <div style={{ margin: 20 }}>
        <Router>
          <Routes>
            <Route exact path='/' element={<MainPage />} />
            <Route exact path='home' element={<DemoTableData />} />
            <Route exact path='view' element={<CryptoViewData />} />
          </Routes>
        </Router>
      </div>
    </>
  )
} 