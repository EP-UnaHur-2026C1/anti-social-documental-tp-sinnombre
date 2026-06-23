import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: true,
  }
})

export async function sendVerificationEmail(to, token) {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify/${token}`

  await transporter.sendMail({
    from: `"Anti-Social Net" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Confirmá tu cuenta en Anti-Social Net',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #26215C;">¡Bienvenido a Anti-Social Net!</h2>
        <p>Hacé click en el botón para confirmar tu cuenta:</p>
        <a href="${verifyUrl}"
           style="display:inline-block; background:#3C3489; color:white;
                  padding:10px 20px; border-radius:8px; text-decoration:none;
                  margin: 16px 0;">
          Confirmar mi cuenta
        </a>
        <p style="color: #888; font-size: 12px;">
          Si no creaste esta cuenta, ignorá este correo.
        </p>
      </div>
    `,
  })
}