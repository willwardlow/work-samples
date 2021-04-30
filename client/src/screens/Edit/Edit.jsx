import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Edit(props) {
  const [formData, setFormData] = useState({
    name: "",
    hourly_rate: "",
  });

  const { name, hourly_rate } = formData;
  const { handleUpdate, handleDelete, orgs } = props;
  const { id } = useParams();

  useEffect(() => {
    const prefillFormData = () => {
      const singleOrg = orgs.find((org) => org.id === Number(id));
      setFormData({
        name: singleOrg.name,
        hourly_rate: singleOrg.hourly_rate,
      });
    };

    if (orgs.length) {
      prefillFormData();
    }
  }, [orgs, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="edit-container">
      Edit Organization
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate(id, formData);
        }}
      >
        <label htmlFor="name">
          {" "}
          Name:
          <input
            type="text"
            name="name"
            value={name}
            required
            onChange={handleChange}
          />
        </label>

        <label htmlFor="hourly_rate">
          <input
            type="number"
            name="hourly_rate"
            value={hourly_rate}
            required
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update</button>
        <Link to="/orgs" onClick={() => handleDelete(id)}>
          Delete
        </Link>
      </form>
    </div>
  );
}
