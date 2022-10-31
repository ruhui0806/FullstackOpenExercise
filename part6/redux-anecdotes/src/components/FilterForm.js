import { filterChange } from "../reducers/filterReducer";
import { useDispatch, useSelector, connect } from "react-redux";

const FilterInput = (props) => {
  const style = {
    marginBottom: 10,
  };

  const handleChange = (event) => {
    props.filterChange(event.target.value);
  };

  return (
    <div style={style}>
      <h2>Filter</h2>
      <div>
        filter: <input name="filter" onChange={handleChange} />
      </div>
    </div>
  );
};
const mapDispatchToProps = {
  filterChange: filterChange,
};

export default connect(null, mapDispatchToProps)(FilterInput);
