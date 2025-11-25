import { MinisRouter } from '@shopify/shop-minis-react'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'

export function App() {
  return (
    <MinisRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add more routes here as needed, e.g. <Route path="/products/:id" element={<ProductDetails />} /> */}
      </Routes>
    </MinisRouter>
  )
}
