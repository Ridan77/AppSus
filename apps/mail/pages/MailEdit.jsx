import { mailService } from "../services/mail.service.js";
import {
  showErrorMsg,
  showSuccessMsg,
} from "../../../services/event-bus.service.js";
const { useEffect } = React;
const { useNavigate, useParams, useSearchParams, Link, useOutletContext } =
  ReactRouterDOM;

const { useState } = React;

export function MailEdit() {
  const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail());
  const [isLoading, setIsLoading] = useState(false);
  const { onUpdateMail } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const noteTxt = mailService.getFilterFromSearchParams(searchParams).body;
  const noteSubject = mailService.getFilterFromSearchParams(searchParams).subject;
  const { mailId } = params;

  const navigate = useNavigate();

  useEffect(() => {
    if (mailId && !noteTxt) loadMail();
  }, [mailId]);

  useEffect(() => {
    if (noteTxt) {
      setSearchParams({});
      setMailToEdit((prevMailToEdit) => ({
        ...prevMailToEdit,
        body: noteTxt,
        subject: noteSubject,
      }));
    }
  }, [noteTxt]);

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

  function onSaveMail(ev, mode) {
    ev.preventDefault();
    if (mode === "send") mailToEdit.sentAt = Date.now();
    mailService
      .save(mailToEdit)
      .then((newMail) => {
        onUpdateMail(newMail);
        if (mode === "draft") showSuccessMsg("Draft saved successfuly");
        else showSuccessMsg("Mail saved successfuly");
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
      <header>
        <div>{mailId ? "Edit draft" : "New Message"}</div>
      </header>
      <form onSubmit={(ev) => onSaveMail(ev, "send")}>
        <button
          onClick={(ev) => onSaveMail(ev, "draft")}
          type="button"
          className="back-button">
          ✖
        </button>
        <input
          placeholder="From"
          className="from-input"
          value={from}
          onChange={handleChange}
          type="email"
          name="from"
          id="from"
        />

        <input
          placeholder="Recipients"
          className="to-input"
          value={to}
          onChange={handleChange}
          type="email"
          name="to"
          id="to"
        />

        <input
          placeholder="Subject"
          className="subject-input"
          value={subject}
          onChange={handleChange}
          type="text"
          name="subject"
          id="subject"
        />

        <textarea
          cols="50"
          rows="30"
          className="body-input"
          value={body}
          onChange={handleChange}
          type="text"
          name="body"
          id="body"
        />

        <button className="send-button">Send</button>
      </form>
    </section>
  );
}
