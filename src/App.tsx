import { Routes, Route } from 'react-router-dom'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import Login from './components/Login'
import ImportScan from './components/ImportScan'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">DD Importer</h1>
          
          <UnauthenticatedTemplate>
            <Login />
          </UnauthenticatedTemplate>

          <AuthenticatedTemplate>
            <Routes>
              <Route path="/" element={<ImportScan />} />
            </Routes>
          </AuthenticatedTemplate>
        </div>
      </div>
    </div>
  )
}

export default App 