import { useAuthContext } from "../hooks/useAuthContext";
import { useCardioContext } from "../hooks/useCardioContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const CardioDetails = ({ cardio }) => {
  const { dispatch } = useCardioContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/cardio/" + cardio._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_CARDIO", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{cardio.title}</h4>
      <p>
        <strong>Reps: </strong>
        {cardio.reps}
      </p>
      <p>
        <strong>Duration (in minutes): </strong>
        {cardio.duration}
      </p>
      <p>
        {formatDistanceToNow(new Date(cardio.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default CardioDetails;
