import { useState, useEffect } from "react";
type QuoteData = {
  quote: string;
  author: string;
};
async function getQuotes(): Promise<QuoteData> {
  const response = await fetch("https://dummyjson.com/quotes/random");
  const data = await response.json();
  return data;
}

function Quote() {
  const [author, setAuthor] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [generate, setGenerate] = useState<string>("Generate New Quote");
  async function displayQuote() {
    try {
      setGenerate("Generating...");
      const data = await getQuotes();
      setQuote(data.quote);
      setAuthor(data.author);
    } finally {
      setGenerate("Generate New Quote");
    }
  }

  useEffect(() => {
    displayQuote();
  }, []);

  const [click, setClick] = useState<string>("Copy Quote");

  async function copyQuote() {
    try {
      await navigator.clipboard.writeText(quote);

      setClick("Copied Successfully");

      setTimeout(function () {
        setClick("Copy Quote");
      }, 800);
    } catch (error) {
      setClick("Copy Failed");
      console.error("Failed to copy quote:", error);
    }
  }
  return (
    
    <>
    <h1 className="body-title">Quote Generator</h1>
    <div className="info">
        <h2 className="sub-head">Some words stay with us.</h2>
        <p className="para">Not every thought needs an answer. Some just need to be felt.</p>
        </div>
    <main className="test">

      <div className="quote-container">
        <p className="quote-text">
          <span className="quote-sign">"</span>
          {quote}
          <span className="quote-sign">"</span>
        </p>
        <p className="quote-author">── {author}</p>
        <hr />
        <button className="create-btn" type="button" onClick={displayQuote}>
          {generate}
        </button>
        <button className="copy-btn" type="button" onClick={copyQuote}>
          {click}
        </button>
      </div>
      </main>
    </>
  );
}

export default Quote;
