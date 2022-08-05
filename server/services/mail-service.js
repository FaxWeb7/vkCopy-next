const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                port: 465,
                authentication: 'plain',
                enable_starttls_auto: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                }
            }
        )
    }

    async sendActivationMail (to, link) {
        await this.transporter.sendMail({
            from: process.env.EMAIL,
            to: to,
            subject: `Активация аккаунта на сайте ${process.env.API_URL}`,
            text: '',
            html:
                `
                    <div>
                        <p>Для активации письма перейдите по ссылке</p>
                        <a href="${link}">${link}</a><br /><br />
                        <p>Если вы не регистрировались на сайте ${process.env.API_URL}, то проигнорируйте это письмо.</p>
                    </div>
                `
        })
    }
}

module.exports = new MailService();