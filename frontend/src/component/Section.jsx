import NewTodo from "./NewTodo";
import Progress from "./Progress";
import OnHold from "./OnHold";
function Section() {
  return (
    <div className="flex gap-[5rem] ">
      <NewTodo />
      <Progress />
      <OnHold/>
    </div>
  );
}
export default Section;
