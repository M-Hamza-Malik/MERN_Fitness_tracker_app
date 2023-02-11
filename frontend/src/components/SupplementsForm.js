import { useState } from "react";
import { useSupplementsContext } from "../hooks/useSupplementsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const SupplementsForm = () => {
  const { dispatch } = useSupplementsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [dosage, setDosage] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const supplement = { title, dosage };

    const response = await fetch("/api/supplements", {
      method: "POST",
      body: JSON.stringify(supplement),
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
      setDosage("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_SUPPLEMENT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Supplement</h3>

      <label>Supplement Name:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Dosage (in mg):</label>
      <input
        type="number"
        onChange={(e) => setDosage(e.target.value)}
        value={dosage}
        className={emptyFields.includes("dosage") ? "error" : ""}
      />

      <button>Add Supplement</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SupplementsForm;
