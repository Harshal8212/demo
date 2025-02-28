import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material"
import { User, UserCheck, Clock, TruckIcon as TruckDelivery, MapPin, DollarSign, CreditCard } from "lucide-react"

const ScrollableCardContent = styled(CardContent)(({ theme }) => ({
  maxHeight: "400px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
    outline: "1px solid slategrey",
  },
}))



export default ({ getModel, setGetModel, getShipment }) => {




  const [index, setIndex] = useState(0);
  const [singleShipmentData, setSingleShipmentData] = useState();
  const [isButtonClicked, setIsButtonClicked] = useState(false); // State to track button click
  const  [details, setDetails] = useState([])

  const resetAllStates = () => {
    setIndex("")
    setSingleShipmentData()
    setIsButtonClicked(false)
    setDetails([])

  };


  const getshipmentData = async () => {
    const getData = await getShipment(index);
    setSingleShipmentData(getData);
    setIsButtonClicked(true); // Mark the button as clicked
    console.log(getData);
  };

   const converTime = (time) => {
      const newTime = new Date(time);
      const dataTime = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(newTime);
  
      return dataTime;
    };


  useEffect(() => {
    if(singleShipmentData){
      setDetails( [
        { icon: User, label: "Sender", value: singleShipmentData.sender.slice(0) },
        { icon: UserCheck, label: "Receiver", value: singleShipmentData.receiver.slice(0) },
        { icon: Clock, label: "Pickup Time", value: converTime(singleShipmentData.pickupTime) },
        { icon: TruckDelivery, label: "Delivery Time", value: converTime(singleShipmentData.deliveryTime) },
        { icon: MapPin, label: "Distance", value: singleShipmentData.distance },
        { icon: DollarSign, label: "Price", value: singleShipmentData.price },
        {
          icon: CreditCard,
          label: "Payment Status",
          value: singleShipmentData.isPaid ? "Paid" : "Unpaid",
          chip: true,
        },
      ])
  }
  }, [singleShipmentData])
  
  
  
  return getModel ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => {setGetModel(false)
          resetAllStates()
        }}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => {setGetModel(false)

                resetAllStates()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              Product Tracking Details
            </h4>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="number"
                  placeholder="Id"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setIndex(e.target.value)}
                />
              </div>

              {!isButtonClicked && ( // Conditionally render button if not clicked
                <button
                  onClick={() => getshipmentData()}
                  className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
                >
                  Get details
                </button>
              )}
            </form>

            {singleShipmentData == undefined ? (
              ""
            ) : (
              <Card elevation={3}>
              <ScrollableCardContent>
                <List>
              
                  {details.map((detail, index) => (
                    <ListItem key={index} divider={index !== details.length - 1}>
                      <ListItemIcon>
                        <detail.icon size={20} />
                      </ListItemIcon>
                      <ListItemText
                        primary={detail.label}
                        secondary={
                          detail.chip ? (
                            <Chip label={detail.value} color={singleShipmentData.isPaid ? "success" : "error"} size="small" />
                          ) : (
                            <Typography variant="body2" style={{ wordBreak: "break-word" }}>
                              {detail.value}
                            </Typography>
                          )
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </ScrollableCardContent>
              {(singleShipmentData.status === 0 || singleShipmentData.status === 1) && (
                <Box p={2}>
                  <Button
                    variant="contained"
                    
                    startIcon={<MapPin />}
                    fullWidth
                    onClick={() => window.open(`/Tracking/${index}`, "_blank")}
                    sx={
                      {color: "white",
                        backgroundColor: "#4f46e5", // indigo-600
                        "&:hover": { backgroundColor: "#6366f1" }, // indigo-500
                        "&:active": { backgroundColor: "#4338ca" }, // indigo-700
                        borderRadius: "0.5rem", // rounded-lg
                        ringOffset: "2px",
                        ringColor: "#4f46e5",
                        "&:focus": { outline: "2px solid #4f46e5" },
                      }
                    }
                  >
                    TRACK
                  </Button>
                </Box>
              )}
            </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
