export function generateServerFile(typescript: boolean) {
  const ext = typescript ? "" : ".js";

  return `
import app from "./app${ext}";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    \`🚀 Server running on port \${PORT}\`
  );
});
`;
}