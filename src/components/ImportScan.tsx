import React, { useState } from 'react'

interface ImportMeta {
  env: {
    VITE_DEFECT_DOJO_URL: string;
    VITE_DEFECT_DOJO_API_KEY: string;
  };
}

const ImportScan: React.FC = () => {
  const [engagementId, setEngagementId] = useState('')
  const [testId, setTestId] = useState('')
  const [isReimport, setIsReimport] = useState(false)
  const [status, setStatus] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!selectedFile) {
      setStatus('Error: Please select a file to upload.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('engagement', engagementId)
      if (isReimport) {
        formData.append('test', testId)
      }
      formData.append('scan_type', 'Generic Findings Import')
      formData.append('file', selectedFile)

      const response = await fetch('/api/api/v2/reimport-scan/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${import.meta.env.VITE_DEFECT_DOJO_API_KEY}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to import scan')
      }

      const data = await response.json()
      setSuccess(true)
      setStatus('Success! Scan imported successfully.')
      setSelectedFile(null)
      setEngagementId('')
      setTestId('')
      setIsReimport(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Import Scan</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">Scan imported successfully!</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Engagement ID</label>
          <input
            type="text"
            value={engagementId}
            onChange={(e) => setEngagementId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isReimport}
            onChange={(e) => setIsReimport(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">Reimport Scan</label>
        </div>

        {isReimport && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Test ID</label>
            <input
              type="text"
              value={testId}
              onChange={(e) => setTestId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required={isReimport}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Scan File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            required
          />
          {selectedFile && (
            <p className="mt-1 text-sm text-gray-500">Selected file: {selectedFile.name}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Importing...' : 'Import Scan'}
        </button>

        {status && (
          <div className={`mt-4 p-4 rounded-md ${status.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {status}
          </div>
        )}
      </form>
    </div>
  )
}

export default ImportScan 