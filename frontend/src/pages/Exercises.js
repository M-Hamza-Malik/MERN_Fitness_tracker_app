import { useEffect } from "react";
import { useExercisesContext } from "../hooks/useExercisesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import ExerciseDetails from "../components/ExerciseDetails";
import ExerciseForm from "../components/ExerciseForm";

const Exercises = () => {
  const { exercises, dispatch } = useExercisesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch("/api/exercises", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_EXERCISES", payload: json });
      }
    };

    if (user) {
      fetchExercises();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {exercises &&
          exercises.map((exercise) => (
            <ExerciseDetails key={exercise._id} exercise={exercise} />
          ))}
      </div>
      <ExerciseForm />
    </div>
  );
};

export default Exercises;
