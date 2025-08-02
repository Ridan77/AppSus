const { useState } = React;

export function LongTxt({ txt, length = 100 }) {
  const [isLongTxt, setIsLongTxt] = useState(false);

  function onToggleText() {
    setIsLongTxt((isLongTxt) => !isLongTxt);
  }
  const isLongerThanLimit = txt.length > length;
  const textToShow =
    isLongTxt || !isLongerThanLimit ? txt : txt.substring(0, length) + "...";

  return (
    <section className="long-txt">
      <p className="txt">{textToShow}</p>
      {isLongerThanLimit && (
        <div>
          <button className="show-txt-btn" onClick={onToggleText}>
            {isLongTxt ? "Show Less" : "Read More"}
          </button>
        </div>
      )}
    </section>
  );
}
