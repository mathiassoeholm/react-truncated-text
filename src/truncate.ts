export function truncate(element: HTMLElement, text: string) {
  const {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  } = getComputedStyle(element);

  element.textContent = text;
  if (element.scrollHeight <= element.clientHeight) {
    // Quick exit if entire text already fits
    return;
  }

  const words = element.textContent?.split(' ') ?? [];
  element.textContent = '';

  element.textContent = words[0] ?? '';
  if (element.scrollHeight > element.clientHeight) {
    // Quick exit if there's not even room for the first word
    element.textContent = '...';
    return;
  }

  const targetHeight =
    element.clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);

  const targetWidth =
    element.clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);

  const measureElem = document.createElement('div');
  measureElem.style.maxWidth = `${targetWidth}px`;

  // Avoid reflow
  measureElem.style.position = 'absolute';

  // Hide measuring element
  measureElem.style.visibility = 'hidden';

  element.appendChild(measureElem);

  let upperLimit = words.length - 1;
  let lowerLimit = 0;

  let finalText = 'Something went wrong';

  function getTextSlicedAt(index: number) {
    return words.slice(0, index + 1).join(' ') + '...';
  }

  function isSmallEnough() {
    return measureElem.clientHeight <= targetHeight;
  }

  function isTooBig() {
    return measureElem.clientHeight > targetHeight;
  }

  while (true) {
    // Use a binary search to find the correct index;
    // this enables working with really large texts.
    const nextGuess = lowerLimit + Math.ceil((upperLimit - lowerLimit) / 2);

    measureElem.textContent = getTextSlicedAt(nextGuess);

    if (isSmallEnough()) {
      lowerLimit = nextGuess + 1;
      measureElem.textContent = getTextSlicedAt(nextGuess + 1);

      if (isTooBig()) {
        finalText = getTextSlicedAt(nextGuess);
        break;
      }
    } else {
      upperLimit = nextGuess - 1;
    }
  }

  element.removeChild(measureElem);
  element.textContent = finalText;
}
