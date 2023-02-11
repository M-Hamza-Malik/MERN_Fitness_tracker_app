import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCardioContext } from "../hooks/useCardioContext";

const CardioForm = () => {
  const { dispatch } = useCardioContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const cardio = { title, reps, duration };

    //APPLY BACKEND THEN CHANGE THIS
    const response = await fetch("/api/cardio", {
      method: "POST",
      body: JSON.stringify(cardio),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    //APPLY BACKEND END
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setReps("");
      setDuration("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_CARDIO", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Cardio Exercise</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <label>Duration (in minutes):</label>
      <input
        type="number"
        onChange={(e) => setDuration(e.target.value)}
        value={duration}
        className={emptyFields.includes("Duration") ? "error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CardioForm;
