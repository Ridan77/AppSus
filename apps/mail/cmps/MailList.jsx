const { Link } = ReactRouterDOM;
import { MailPreview } from "../cmps/MailPreview.jsx";

export function MailList({ onRemoveMail, onToggleReadState, mails }) {
  if (!mails.length) return <div>No Mails To Show...</div>;
  return (
    <ul>
      {mails.map((mail) => (
        <li key={mail.id} className={mail.isRead ? 'read' : ''}>
          {<MailPreview mail={mail} />}
          <div>
            <button onClick={() => onRemoveMail(mail.id)}>Delete</button>
            <button onClick={() => onToggleReadState(mail)}>
              {mail.isRead ? "Unread" : "Read"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
