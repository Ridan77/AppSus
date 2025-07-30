import { mailService } from "../services/mail.service.js";
import {
  showErrorMsg,
  showSuccessMsg,
} from "../../../services/event-bus.service.js";
import { utilService } from "../../../services/util.service.js";
import { MailList } from "../cmps/MailList.jsx";

const { useState, useEffect } = React;
const { Link, useSearchParams } = ReactRouterDOM;

export function MailIndex() {
  const [mails, setMails] = useState(null);
  const [isReadStatus, setIsReadStatus] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromSearchParams(searchParams)
  );

  useEffect(() => {
    setSearchParams(utilService.getTruthyValues(filterBy));
    loadMails();
  }, [filterBy,isReadStatus]);

  function loadMails() {
    mailService
      .query(filterBy)
      .then((mails) => {
        setMails(mails);
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Cannot get cars!");
      });
  }

  function onRemoveMail(mailId) {
    console.log('removing ',mailId)
    mailService
      .remove(mailId)
      .then(() => {
        setMails((prevMails) => prevMails.filter((mail) => mail.id !== mailId));
        showSuccessMsg(`Mail (${mailId}) deleted successfully from trash!`);
      })
      .catch((err) => {
        console.log("Problem deleting mail:", err);
        showErrorMsg("Problem deleting mail!");      });
  }

  function onSetFilterBy(filterByToEdit) {
    setFilterBy({ ...filterByToEdit });
  }

  function onToggleReadState(mail) {
    const newMail={...mail,isRead:!mail.isRead}
    mailService.save(newMail)
      .then(()=>setIsReadStatus(!isReadStatus));
  }

  if (!mails) return <div className="loader">Loading...</div>;
  return (
    <section className="mail-index">
      {/* <button ><Link to={`/car/${car.prevCarId}`}>Prev Car</Link></button> */}
      <button></button>
      {/* <CarFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} /> */}

      <section className="list-container">
        <MailList
          onRemoveMail={onRemoveMail}
          onToggleReadState={onToggleReadState}
          mails={mails}
        />
      </section>
    </section>
  );
}
