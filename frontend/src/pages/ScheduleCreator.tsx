import { useState } from "react";
import { DndProvider } from "react-dnd";
import { Draggable } from "react-drag-reorder";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Reorder } from "../components/dragdrop/Reorder.tsx";

export default function ScheduleCreator() {
  const [words] = useState(["Hello", "Hi", "How are you", "Cool"]);

  return (
    <div className="flex-container">
      <div className="row">
        <DndProvider backend={HTML5Backend}>
          <Reorder />
        </DndProvider>
      </div>
    </div>
  );
}
