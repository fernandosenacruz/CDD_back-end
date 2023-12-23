export default function verifyOffensiveWords(text: string, offensiveWords: string) {
  let wordsArray = offensiveWords.split('/');

  wordsArray.forEach((word) => {
      let escapedWord = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      let regex = new RegExp(escapedWord, "gi");
      let twoThirdsWord = getTwoThirdsSubstring(escapedWord);
      let censoredWord = twoThirdsWord + word.replace(regex, '*'.repeat(lengthAsterisks(escapedWord)));
      text = text.replace(regex, censoredWord);
  });

  return text;
}

const lengthAsterisks = (word: string): number => {
  return Math.ceil(word.length/3);
}

const getTwoThirdsSubstring = (word: string) => {
  const twoThirdsLength = Math.floor((2 / 3) * word.length);
  return word.slice(0, twoThirdsLength);
};