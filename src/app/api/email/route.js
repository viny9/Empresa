import { NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer'

export const POST = async (req) => {
    const res = NextResponse
    try {

        const { email, name, phone, message } = await req.json()

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'viniolicar2004@gmail.com',
                pass: "gysbmdfzbsqemtfi", //O tipo de senha usado é "senhas de app"
            },
        });

        const html = `
    <div>
      <h1>Nome: ${name}</h1>
      <h1>Email: ${email}</h1>
      <h1>Celular: ${phone}</h1>
      <h1>Mensagem: ${message}</h1>
    </div>
    `

        const messages = {
            from: 'viniolicar2004@gmail.com',
            to: 'viniolicar2004@gmail.com',
            subject: "Teste", // Subject line
            html: html
        };

        // webtechdev3@gmail.com
        await new Promise((resolve, reject) => {
            transporter.sendMail(messages, (error, info) => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
        })

        return res.json({ message: 'Email foi enviado com sucesso' })
    } catch (error) {
        return res.json({ message: 'Email não enviado' })
    }
}