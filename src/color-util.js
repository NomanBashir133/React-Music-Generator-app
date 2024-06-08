export const generateRandomColor = () => {
  let color;
  do {
      color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  } while (isPurple(color));
  return color;
};

const isPurple = (hex) => {
  const red = parseInt(hex.substring(1, 3), 16);
  const green = parseInt(hex.substring(3, 5), 16);
  const blue = parseInt(hex.substring(5, 7), 16);

  return red > 100 && blue > 100 && green < 100;
};
