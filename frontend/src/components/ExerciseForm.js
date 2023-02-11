import { useState } from "react";
import { useExercisesContext } from "../hooks/useExercisesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ExerciseForm = () => {
  const { dispatch } = useExercisesContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const exercise = { title, reps };

    const response = await fetch("/api/exercises", {
      method: "POST",
      body: JSON.stringify(exercise),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_EXERCISE", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Exercise</h3>

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

      <button>Add Exercise</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ExerciseForm;
