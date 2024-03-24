import NewTodo from "./NewTodo";
import Progress from "./Progress";
import OnHold from "./OnHold";
import Completed from "./Completed";
import Closed  from "./Closed";
function Section() {
  return (
    <div className="flex gap-[5rem] ">
      <NewTodo />
      <Progress />
      <OnHold />
      <Completed />
      <Closed />
    </div>
  );
}
export default Section;
