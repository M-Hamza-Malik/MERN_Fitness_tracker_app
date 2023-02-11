import { useSupplementsContext } from "../hooks/useSupplementsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const SupplementsDetails = ({ supplements }) => {
const { dispatch } = useSupplementsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/supplements" + supplements._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_SUPPLEMENT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{supplements.title}</h4>
      <p>
        <strong>Dosage (mg): </strong>
        {supplements.dosage}
      </p>
      <p>
        {formatDistanceToNow(new Date(supplements.createdAt), {
          addSuffix: true,
        })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default SupplementsDetails;
