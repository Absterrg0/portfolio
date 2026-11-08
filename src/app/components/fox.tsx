import { fox, foxEye } from "../data/ascii";

// The fox is static text. Its eye is a span so CSS can close it now and then.
export function Fox() {
  const { row, col } = foxEye;
  const before = fox.slice(0, row).join("\n") + "\n" + fox[row].slice(0, col);
  const eye = fox[row][col];
  const after = fox[row].slice(col + 1) + "\n" + fox.slice(row + 1).join("\n");

  return (
    <pre className="art fox" aria-hidden="true">
      {before}
      <span className="eye">{eye}</span>
      {after}
    </pre>
  );
}
