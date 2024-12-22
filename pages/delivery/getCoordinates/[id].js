import CoordinatesComponent from "../../../Components/CoordinatesComponent";
import { useRouter } from "next/router";

export default function getcordinates({  })  {
    const router = useRouter()
    const {id} = router.query

   
   
  return (
    <div>
      <CoordinatesComponent 
        index={id}
      />
    </div>
  );
};
