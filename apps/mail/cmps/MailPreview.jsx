export function MailPreview({ mail }) {
  const { from, subject, sentAt, isRead,body } = mail;
  var dateFormatted
  if (sentAt) {
    const date = new Date(sentAt);
     dateFormatted = `${date.getDay()}/
  ${date.getDate()}/${date.getFullYear()}`;
  } else dateFormatted = "";
  return (
    <div className="mail-preview-container">
      <div className="from-field">{from}</div>
      <div className="subject-field">{subject}<span>{body}</span> </div>
      <div className="date-field">{dateFormatted}</div>
    </div>
  );
}
