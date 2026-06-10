import type { Env } from '../env'

const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, { status: 204, headers: CORS })

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const row = await env.DB.prepare(
      'SELECT data FROM question_bank WHERE id = 1'
    ).first<{ data: string }>()

    if (!row) {
      return new Response(JSON.stringify(null), { headers: CORS })
    }

    return new Response(row.data, { headers: CORS })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: CORS,
    })
  }
}

export const onRequestPut: PagesFunction<Env> = async ({ env, request }) => {
  try {
    const body = await request.text()

    // Basic validation — must be valid JSON
    JSON.parse(body)

    await env.DB.prepare(
      `INSERT INTO question_bank (id, data, updated_at)
       VALUES (1, ?, datetime('now'))
       ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`
    )
      .bind(body)
      .run()

    return new Response(JSON.stringify({ ok: true }), { headers: CORS })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: CORS,
    })
  }
}
