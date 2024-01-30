'use server'

import { z } from 'zod'

const FormSchema = z
  .object({
    username: z
      .string()
      .min(1, 'ユーザ名を入力してください')
      .max(12, 'ユーザ名は12文字以内で入力してください'),
    password: z.string().min(1, 'パスワードを入力してください'),
    password_confirm: z.string().min(1, '確認用パスワードを入力してください'),
    birthday: z.date(),
  })
  .refine(
    (args) => {
      const { password, password_confirm } = args
      // 確認用パスワードが一致しているか
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

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
    password_confirm: formData.get('password_confirm'),
  })
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'エラーを修正してください',
    }
  }
  return prevState

  // TODO: この辺でDB登録処理

  // revalidatePath('/dashboard/invoices')
  // redirect('/dashboard/invoices')
}
