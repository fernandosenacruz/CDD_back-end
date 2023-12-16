export default function verifyOffensiveWords(text: string, offensiveWords: string) {
  let wordsArray = offensiveWords.split('/');

  wordsArray.forEach((word) => {
      let escapedWord = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      let regex = new RegExp(escapedWord, "gi");
      text = text.replace(regex, "*".repeat(lengthAsterisks(escapedWord)));
  });

  return text;
}

const lengthAsterisks = (word: string): number => {
  return Math.ceil(word.length/3);
}