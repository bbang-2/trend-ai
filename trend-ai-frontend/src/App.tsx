import { useState } from 'react'
import './App.css'
import Search from './views/Search'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AiResultView from './views/AiResult'
import TrendReportPage from './views/TrendReportPage'
import MainPage from './layouts/MainPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/search/news' element={<Search />} />
          <Route path="/analysis/:articleId" element={<AiResultView />} />
          <Route path="/trend/report/:keyword" element={<TrendReportPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
