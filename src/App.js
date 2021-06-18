import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles.js";
import wordsToNumbers from "words-to-numbers";

const alanKey =
  "9d55eff564e8f8b37c2af02b80cba1aa2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsAtricles, setNewsAtricles] = useState([]);
  const [activeAtricle, setActiveAtricle] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsAtricles(articles);
          setActiveAtricle(-1);
        } else if (command === "highlight") {
          setActiveAtricle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText("please try that again");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("opening the article for you");
          }
        }
      },
    });
  }, []);
  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src='https://cdn.corporatefinanceinstitute.com/assets/artificial-intelligence-1024x512.jpeg'
          alt='alanLogo'
          className={classes.alanLogo}
        />
      </div>
      <NewsCards articles={newsAtricles} activeAtricle={activeAtricle} />
    </div>
  );
};

export default App;
