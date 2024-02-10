import { Button, Container, Input } from "@mui/joy";
import { Draggable } from "react-drag-reorder";
import Reorder from "react-reorder";
import { useState } from "react";

export default function ScheduleCreator() {
  const itemClicked = (item: string) => {};
  const selected = { uuid: "123" };
  const [words] = useState(["Hello", "Hi", "How are you", "Cool"]);

  return (
    <Container maxWidth={"md"} sx={{ flex: 1 }}>
      <div className="flex-container">
        <div className="row">
          <Draggable>
            {words.map((word, idx) => (
              <div key={idx} className="flex-item">
                {word}
              </div>
            ))}
          </Draggable>
        </div>
      </div>
    </Container>
  );
}
