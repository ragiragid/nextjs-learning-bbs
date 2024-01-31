'use server'

import { existUser } from '@/app/lib/user-data'
import { sql } from '@vercel/postgres'
import { redirect } from 'next/navigation'
import { ZodError, z } from 'zod'

/**
 * 入力されたユーザ名が一意かどうかをチェックする
 * @param name
 * @returns
 */
async function isUniqueUserName(name: string): Promise<boolean> {
  try {
    // existUser の実行結果を待機する Promise
    const userExistsPromise = existUser(name)

    // 2秒のタイムアウト用の Promise
    const timeoutPromise = new Promise<boolean>((_, reject) => {
      setTimeout(() => {
        reject(new Error('ユーザ名存在チェックエラー'))
      }, 5000)
    })

    // Promise.race を使用して、2秒以内に existUser の結果が取得できなかった場合はエラーを throw
    const result = await Promise.race([userExistsPromise, timeoutPromise])

    // existUser の結果が取得できたらその結果を返す
    return !result
  } catch (error) {
    // エラーが発生した場合はそのまま throw
    throw error
  }
}

const FormSchema = z
  .object({
    username: z
      .string()
      .min(1, 'ユーザ名を入力してください')
      .max(12, 'ユーザ名は12文字以内で入力してください')
      .refine(
        async (args) => {
          const result = await isUniqueUserName(args)
          return result
        },
        {
          message: 'そのユーザ名は既に使用されています',
          path: ['username'],
        },
      ),
    password: z
      .string()
      .min(8, { message: 'パスワードを8文字以上で入力してください' }),
    password_confirm: z
      .string()
      .min(1, { message: '確認用パスワードを入力してください' }),
    birthday: z.coerce.date({
      errorMap: () => ({
        message: '生年月日には日付を入力してください',
      }),
    }),
  })
  // 確認用パスワードが一致しているかチェック
  .refine(
    (args) => {
      const { password, password_confirm } = args
      return password == password_confirm
    },
    {
      message: '確認用パスワードが一致していません',
      path: ['password_confirm'],
    },
  )

export type State = {
  errors?: {
    username?: string[]
    password?: string[]
    password_confirm?: string[]
    birthday?: string[]
  }
  message?: string | null
}

export async function createUser(
  prevState: State,
  formData: FormData,
): Promise<{
  errors?: {
    username?: string[] | undefined
    password?: string[] | undefined
    password_confirm?: string[] | undefined
    birthday?: string[] | undefined
  }
  message?: string | null
}> {
  try {
    const validatedFields = await FormSchema.parseAsync({
      username: formData.get('username'),
      password: formData.get('password'),
      password_confirm: formData.get('password_confirm'),
      birthday: formData.get('birthday'),
    })

    const { username, password, birthday } = validatedFields
    const formattedBirthday = birthday.toISOString().split('T')[0]
    await sql`
      INSERT INTO l1_users (username, password, birthday)
      VALUES (${username}, ${password}, ${formattedBirthday})
    `
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return {
        errors: error.flatten().fieldErrors,
        message: 'エラーがあります。ご確認ください',
      }
    } else if (error instanceof Error) {
      console.error('other error:', error)
      return {
        message: '想定外のエラーが発生しました : ErrorType: Error',
      }
    } else {
      // その他の場合の処理
      console.error('Unknown error:', error)
      return {
        message: '想定外のエラーが発生しました : ErrorType: unknown',
      }
    }
  }
  redirect('/login')
}
