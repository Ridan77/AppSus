export function MailPreview({ mail,onToggleStarState }) {
  const { from, subject, sentAt, isRead, body } = mail;
  var dateFormatted;

  function onStarClick(ev, mail) {
    ev.stopPropagation();
    console.log(mail.isStared)
    onToggleStarState(mail)

  }
  if (sentAt) {
    const date = new Date(sentAt);
    dateFormatted = `${date.getDay()}/
  ${date.getDate()}/${date.getFullYear()}`;
  } else dateFormatted = "";
  return (
    <div className="mail-preview-container">
      <button
        className={mail.isStared ? "stared"+' star-button' : "" +' star-button'} 
        onClick={(ev) => onStarClick(ev, mail)}>
        {/* ⭐ */}
        {mail.isStared ? "⭐" : "☆"}
      </button>
      <div className="from-field">{from}</div>
      <div className="subject-field">
        {subject}
        <span>{body}</span>{" "}
      </div>
      <div className="date-field">{dateFormatted}</div>
    </div>
  );
}
