export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  process.on('uncaughtException', (err) => {
    console.error('uncaughtException', err)
  })

  process.on('unhandledRejection', (err) => {
    console.error('unhandledRejection', err)
  })
}
