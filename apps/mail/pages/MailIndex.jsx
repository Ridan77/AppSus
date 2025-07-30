import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    mailService.get('^&^&^')
    return <section className="container">Mail app</section>
}

