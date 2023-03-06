export function saveToLocalStorage(key, value) {
  let parsedValue = typeof(value) === "object" ? JSON.stringify(value) : value;
  localStorage.setItem(key, parsedValue);
}

export function getFromLocalStorage(key) {
  const value = localStorage.getItem(key);
  let parsed;
  try {
      parsed = JSON.parse(value)
  } catch (error) {
      parsed = value
  }
  return parsed; 
}

export function testPlaceHolder(text) {
  return !!text ? text : <i style={{ opacity: 0.4 }}>Undefined</i>
}