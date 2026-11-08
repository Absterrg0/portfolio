import { fox, foxEye } from "../data/ascii";

// The fox is static text. Its eye is a span so CSS can make it blink now and then.
export function Fox() {
  const { row, col, width } = foxEye;
  const before = fox.slice(0, row).join("\n") + "\n" + fox[row].slice(0, col);
  const eye = fox[row].slice(col, col + width);
  const after = fox[row].slice(col + width) + "\n" + fox.slice(row + 1).join("\n");

  return (
    <pre className="art fox" aria-hidden="true">
      {before}
      <span className="eye">{eye}</span>
      {after}
    </pre>
  );
}
