/**
 * vercel のDBを使用する。
 * Next.js チュートリアルでも使用しているので、同居できるよう、
 * このプロジェクトのテーブルはプレフィックスとして「l1」（learning 1の意味）を付与する
 */
const { db } = require('@vercel/postgres')
const bcrypt = require('bcrypt')

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS l1_users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password TEXT NOT NULL,
        birthday DATE NOT NULL
      );
    `
    console.log(`Created "l1_users" table`)

    return {
      createTable,
    }
  } catch (error) {
    console.error('Error seeding l1_users:', error)
    throw error
  }
}

async function main() {
  const client = await db.connect()

  await seedUsers(client)
  await client.end()
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err)
})
