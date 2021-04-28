
import { useState } from 'react';

export default function Create(props) {
  
  const [formData, setFormData] = useState({
    name: '',
    hourly_rate: ''
  });

  const { name, hourly_rate } = formData;

  const { handleCreate, handleJoin } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]:value
    }))
  }

  return (
    <div className='create-container'>
      <h2>Create Organization</h2>
      <form className='create-org'
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate(formData);
          handleJoin();
      }}>
        <label htmlFor='name'>
          Name
           <input
            name='name'
            value={name}
            required
            onChange={handleChange}
            />
        </label>

        <label htmlFor='hourly-rate'>
          Hourly Rate: $
          <input
            name='hourly_rate'
            value={hourly_rate}
            type='number'
            required
            onChange={handleChange}
          />
          per hour
        </label>

        <button type='submit'> Create &#38; Join </button>
      </form>
    </div>
  )
}
