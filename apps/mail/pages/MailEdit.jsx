import { mailService } from "../services/mail.service.js";
import {
  showErrorMsg,
  showSuccessMsg,
} from "../../../services/event-bus.service.js";
const { useEffect } = React;
const { useNavigate, useParams, Link,useOutletContext } = ReactRouterDOM;

const { useState } = React;

export function MailEdit() {
  const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail());
  const [isLoading, setIsLoading] = useState(false);
  const { onUpdateMail } = useOutletContext();
  const navigate = useNavigate();
  const { mailId } = useParams();
  console.log("inside edit");
  useEffect(() => {
    if (mailId) loadMail();
  }, [mailId]);

  function loadMail() {
    setIsLoading(true);
    mailService
      .get(mailId)
      .then((mail) => setMailToEdit(mail))
      .catch((err) => console.log("err:", err))
      .finally(() => setIsLoading(false));
  }

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;
    switch (target.type) {
      case "number":
      case "range":
        value = +value;
        break;

      case "checkbox":
        value = target.checked;
        break;
    }
    setMailToEdit((prevMail) => ({ ...prevMail, [field]: value }));
  }

  function onSaveMail(ev) {
    ev.preventDefault();
    mailToEdit.sentAt = Date.now();
    mailService
      .save(mailToEdit)
      .then((newMail) => {
        onUpdateMail(newMail)
        showSuccessMsg("Mail saved successfuly");
        navigate("/mail");
      })
      .catch((err) => {
        console.log("Cannot save mail!:", err);
        showErrorMsg("Cannot save mail!");
      });
  }

  const loadingClass = isLoading ? "loading" : "";
  const { from, to, subject, body, createdAt } = mailToEdit;
  return (
    <section className={"mail-edit " + loadingClass}>
      <h1>{mailId ? "Edit" : "Compose new"} Mail</h1>
      <form onSubmit={onSaveMail}>
        <label htmlFor="from">From</label>
        <input
          className="from-input"
          value={from}
          onChange={handleChange}
          type="email"
          name="from"
          id="from"
        />

        <label htmlFor="to">To</label>
        <input
          className="to-input"
          value={to}
          onChange={handleChange}
          type="email"
          name="to"
          id="to"
        />

        <label htmlFor="subject">Subject</label>
        <input
          className="subject-input"
          value={subject}
          onChange={handleChange}
          type="text"
          name="subject"
          id="subject"
        />

        <label htmlFor="body">Email:</label>
        <textarea
          cols="50"
          rows="10"
          className="body-input"
          value={body}
          onChange={handleChange}
          type="text"
          name="body"
          id="body"
        />

        <div>
          <button>Send</button>
          <button type="button">
            <Link to="/mail">Back</Link>
          </button>
        </div>
      </form>
    </section>
  );
}
