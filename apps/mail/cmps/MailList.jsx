const { Link } = ReactRouterDOM;
import { MailPreview } from '../cmps/MailPreview.jsx'

export function MailList({ onRemoveMail, onToggleReadState, mails }) {

  if (!mails.length) return <div>No Mails To Show...</div>;
  return (
    <ul>
      {mails.map((mail) => (
        <li key={mail.id}>
          <MailPreview mail={mail} />
          <section>
            <button onClick={() => onRemoveMail(mail.id)}>Delete</button>
            <button onClick={() => onToggleReadState(mail.id)}>{mail.isRead ? 'Unread' : 'Read'}</button>
          </section>
        </li>
      ))}
    </ul>
  );
}
