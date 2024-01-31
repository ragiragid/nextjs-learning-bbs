import { User } from '@/app/lib/definitions'
import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'

/**
 * 指定されたユーザ名に該当するユーザがいるかチェックし、いればtrue、いなければfalseを返却する
 * @param username ユーザ名
 * @returns 該当するユーザがいれば true、いなければ false
 */
export async function existUser(username: string): Promise<boolean> {
  noStore()
  const data =
    await sql<User>`SELECT * FROM l1_users WHERE username = ${username}`
  const result = data.rows.length > 0
  return result
}
