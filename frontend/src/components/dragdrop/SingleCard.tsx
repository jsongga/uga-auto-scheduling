import Paper from "@mui/material/Paper";

export default function SingleCard(props: { children: React.ReactNode }) {
  return (
    <Paper elevation={3}>
      <h1>SingleCard</h1>
      {props.children}
    </Paper>
  );
}
