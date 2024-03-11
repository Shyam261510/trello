import { useSelector } from "react-redux";
function OnHold() {
  const onHold = useSelector((state) => state.todoReducer.onHold);
  return (
    <div>
        <h2>On Hold</h2>
      {onHold.map((data) => (
        <div key={data.id}>
          <h2>{data.title}</h2>
        </div>
      ))}
    </div>
  );
}
export default OnHold;
