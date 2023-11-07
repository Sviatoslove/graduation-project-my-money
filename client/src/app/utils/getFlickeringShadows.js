export default function getFlickeringShadows( element, style, value) {
  let i = 0;

  const refreshId = setInterval(() => {
    valueIncrement(refreshId, element);
  }, 30);

  function valueDecrement(int, element) {
    if (i) {
      i = +((i * 100 - 1) / 100).toFixed(2);
      element?.style.setProperty(style, `${value} ${i})`);
    } else {
      clearInterval(int);
      const refreshId = setInterval(() => {
        valueIncrement(refreshId, element);
      }, 30);
    }
  }

  function valueIncrement(int, element) {
    if (i < 1) {
      i = +((i * 100 + 1) / 100).toFixed(2);
      element?.style.setProperty(style, `${value} ${i})`);
    } else {
      clearInterval(int);
      const refreshId = setInterval(() => {
        valueDecrement(refreshId, element, 30);
      });
    }
  }
}
