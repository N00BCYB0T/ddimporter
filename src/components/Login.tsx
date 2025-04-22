import { useMsal } from '@azure/msal-react'

const Login = () => {
  const { instance } = useMsal()

  const handleLogin = () => {
    instance.loginRedirect({
      scopes: ['user.read']
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign in with Microsoft
        </button>
      </div>
    </div>
  )
}

export default Login 