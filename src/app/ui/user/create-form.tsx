'use client'

import { createUser } from '@/app/lib/user-actions'
import ja from 'date-fns/locale/ja'
import Link from 'next/link'
import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useFormState } from 'react-dom'

registerLocale('ja', ja)

export default function CreateForm() {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createUser, initialState)
  const Today = new Date()
  const [birthday, setBirthday] = useState(Today)
  return (
    <form action={dispatch}>
      <div className="flex h-screen justify-center items-center">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">ユーザ登録</h2>
          <div className="mb-4">
            <p>
              メールアドレスなどを使用しない、シンプルなユーザ登録です。
              <br />
              重複しないユーザ名を指定してください
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              ユーザ名
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-2 w-full border rounded-md"
              aria-describedby="username-error"
            />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.username &&
              state.errors.username.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              パスワード
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              aria-describedby="password-error"
            />
          </div>
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password_confirm"
              className="block text-sm font-medium text-gray-600"
            >
              パスワードの再確認
            </label>
            <input
              type="password"
              id="password_confirm"
              name="password_confirm"
              className="mt-1 p-2 w-full border rounded-md"
              aria-describedby="password_confirm-error"
            />
          </div>
          <div
            id="password_confirm-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.password_confirm &&
              state.errors.password_confirm.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <div className="mb-4">
            <label
              htmlFor="birthday"
              className="block text-sm font-medium text-gray-600"
            >
              生年月日
            </label>
            <DatePicker
              locale="ja"
              onChange={(selectedDate) => {
                setBirthday(selectedDate || Today)
              }}
              dateFormat="yyyy/MM/dd"
              selected={birthday}
              maxDate={Today}
            />
          </div>
          <div id="birthday-error" aria-live="polite" aria-atomic="true">
            {state.errors?.birthday &&
              state.errors.birthday.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              新規登録
            </button>
            <Link href="/" className="text-blue-500">
              キャンセル
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}
