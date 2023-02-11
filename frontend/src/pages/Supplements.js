import { useEffect } from "react";
import { useSupplementsContext } from "../hooks/useSupplementsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import SupplementsDetails from "../components/SupplementsDetails";
import SupplementsForm from "../components/SupplementsForm";

const Supplements = () => {
  const { supplements, dispatch } = useSupplementsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchSupplements = async () => {
      const response = await fetch("/api/supplements", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_SUPPLEMENTS", payload: json });
      }
    };

    if (user) {
      fetchSupplements();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {supplements &&
          supplements.map((supplements) => (
            <SupplementsDetails key={supplements._id} supplements={supplements} />
          ))}
      </div>
      <SupplementsForm />
    </div>
  );
};

export default Supplements;
