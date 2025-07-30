export function MailPreview({ mail }) {
  const { from, subject, sentAt, isRead } = mail;
  return (
    <table>
      <tbody>
        <tr>
          <td style={{ width: "30px" }}>{from}</td>
          <td>{subject}</td>
          <td>{isRead}</td>
        </tr>
      </tbody>
    </table>
  );
}
