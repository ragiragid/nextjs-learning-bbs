import Link from 'next/link'

export default function Login() {
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">ログイン</h2>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button className="bg-blue-500 text-white p-2 rounded-md">
              ログイン
            </button>
            <Link href="/user/create" className="text-blue-500">
              新規登録はこちら
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
