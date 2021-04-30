import { useParams } from "react-router-dom";
import { useState } from "react";

export default function Shifts(props) {
  const { orgs, shifts, handleShiftCreate, currentUser } = props;
  const { id } = useParams();

  //setting state for shiftData
  const [shiftData, setShiftData] = useState({
    start: "",
    finish: "",
    user_id: currentUser?.id,
    break_length: 0,
  });

  //handle change function to set values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShiftData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //unpacking shiftData elements
  const { start, finish, break_length } = shiftData;

  //find function to find selected organization
  const selectedOrg = orgs.find((org) => org.id === Number(id));

  //finding all associated employees who has a shift at selectedOrg
  const employees = shifts.filter((shift) => shift.user.organization_id === selectedOrg.id);
  

  //functions to extract date parts and calculations from shift object:

  //pulling the date and displaying it as MM/DD/YYYY format
  const extractDate = (dateString) => {
    const t = dateString.indexOf("T");
    const date = dateString.slice(0, t).split("-");
    return date[1] + "/" + date[2] + "/" + date[0];
  };

  //pulling the time and displaying it in 24 hour format
  const extractTime = (dateString) => {
    const t = dateString.indexOf("T");
    const colon = dateString.lastIndexOf(":");
    const time = dateString.slice(t + 1, colon);
    return time;
  };

  //calculating the time difference between start, break, and finish:
  const timeDifference = (startTime, finishTime, breakLength) => {
    let hrs = 0;
    let mins = 0;

    //splitting timestamps to hour and minutes & converting to decimal notation
    const start = extractTime(startTime).split(":");
    const finish = extractTime(finishTime).split(":");
    hrs = Number(finish[0]) - Number(start[0]);
    //handling edge case if minutes of start/finish is less than/greater than the other
    if (start[1] > finish[1]) {
      mins = Number(start[1]) - Number(finish[1]) - breakLength;
    } else {
      mins = Number(finish[1]) - Number(start[1]) - breakLength;
    }

    return (hrs + mins / 60).toFixed(2);
  };

  //calculating shift cost:
  const shiftCost = (startTime, finishTime, breakLength, shiftCost) => {
    //getting day of week
    const date = Date(startTime).split(" ");
    const day = date[0];

    //calling above function get the time difference
    const time = timeDifference(startTime, finishTime, breakLength);

    //handling optional problem # 6
    if (day === "Sun") {
      return `$ ${time * (shiftCost * 2)}`;
    } else {
      return `$ ${time * shiftCost}`;
    }
  };

  return (
    <div className="org-shifts">
      {selectedOrg?.name}
      <table>
        <tr>
          <th>Employee Name</th>
          <th>Shift Date</th>
          <th>Start Time</th>
          <th>Finish Time</th>
          <th>Break Length (minutes)</th>
          <th>Hrs Worked</th>
          <th>Shift Cost</th>
        </tr>
        {/* map function to populate shifts */}
        {employees.map((employee, index) => (
          <tr key={index}>
            <td>{employee.user.name}</td>
            <td>{extractDate(employee.start)}</td>
            <td>{extractTime(employee.start)}</td>
            <td>{extractTime(employee.finish)}</td>
            <td>{employee.break_length}</td>
            <td>
              {timeDifference(
                employee.start,
                employee.finish,
                employee.break_length
              )}
            </td>
            <td>
              {shiftCost(
                employee.start,
                employee.finish,
                employee.break_length,
                selectedOrg.hourly_rate
              )}{" "}
            </td>
          </tr>
        ))}
        <tr>
          <td>{currentUser?.name}</td>
          <td>
            <input
              type="datetime-local"
              name="start"
              value={start}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              type="datetime-local"
              name="finish"
              value={finish}
              onChange={handleChange}
            />
          </td>
          <td></td>
          <td>
            <input
              type="number"
              name="break_length"
              value={break_length}
              onChange={handleChange}
            />
          </td>

          <td>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleShiftCreate(shiftData, selectedOrg.id);
              }}
            >
              {" "}
              Create Shift
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
}
