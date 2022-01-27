import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css//HeroCard.css'
import { CryptoDetails } from './components/commonComponent/CryptoDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CryptoViewData } from './components/commonComponent/CryptoViewData';
import { MainPage } from './components/commonComponent/MainPage';
import DemoTableData from "./components/commonComponent/DemoTableData"

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