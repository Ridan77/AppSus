const { Link, useNavigate } = ReactRouterDOM;
import { MailPreview } from "../cmps/MailPreview.jsx";

function onGoTo(link) {}

export function MailList({ onRemoveMail, onToggleReadState, mails }) {
  const unReadClass = "fa-solid fa-envelope-open";
  const readClass = "fa-solid fa-envelope";
  const navigate = useNavigate();
  if (!mails.length) return <div>No Mails To Show...</div>;
  return (
    <ul>
      {mails.map((mail) => (
        <li
          key={mail.id}
          className={mail.isRead ? "read" : ""}
          onClick={() => {
            onToggleReadState(mail);
            navigate(mail.sentAt ? `/mail/${mail.id}` : `./edit/${mail.id}`);
          }}>
          {<MailPreview mail={mail} />}

          <div className="btn-container">
            <button
              onClick={(ev) => {
                ev.stopPropagation();
                onRemoveMail(mail);
              }}>
              <i className="fa-solid fa-trash"></i>
            </button>
            <button
              onClick={(ev) => {
                ev.stopPropagation();
                onToggleReadState(mail);
              }}>
              <i className={mail.isRead ? unReadClass : readClass}></i>
            </button>
            {/* <button onClick={()=>onToggleReadState(mail)}>
              <Link to={`/mail/${mail.id}`}>
              <i className="fa-regular fa-share-from-square"></i>
              </Link>
            </button> */}
          </div>
        </li>
      ))}
    </ul>
  );
}
