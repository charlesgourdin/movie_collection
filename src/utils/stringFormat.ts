export default function textFormat(text: string) {
  return  text.charAt(0).toUpperCase() + text.slice(1).replace('_', ' ');
}