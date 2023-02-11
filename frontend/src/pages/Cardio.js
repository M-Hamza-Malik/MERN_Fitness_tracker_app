import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCardioContext } from "../hooks/useCardioContext";

// components
import CardioDetails from "../components/CardioDetails";
import CardioForm from "../components/CardioForm";

const Cardio = () => {
  const { cardio, dispatch } = useCardioContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCardios = async () => {
      const response = await fetch("/api/cardio", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CARDIO", payload: json });
      }
    };

    if (user) {
      fetchCardios();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {cardio &&
          cardio.map((cardio) => (
            <CardioDetails key={cardio._id} cardio={cardio} />
          ))}
      </div>
      <CardioForm />
    </div>
  );
};

export default Cardio;
