
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PassengerForm from "./PassengerForm";
import BookingSummary from "./BookingSummary";
import PaymentForm from "./PaymentForm";
import TicketGenerator from "./TicketGenerator";

interface PassengerDetails {
  firstName: string;
  lastName: string;
  age: string;
}

interface FlightDetails {
  id: string;
  flightNumber: string;
  airline: string;
  departure: {
    city: string;
    time: string;
  };
  arrival: {
    city: string;
    time: string;
  };
  duration: string;
  price: number;
  date: string;
}

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
  flight: FlightDetails;
}

const BookingDialog = ({ open, onClose, flight }: BookingDialogProps) => {
  const [currentStep, setCurrentStep] = useState<"passengers" | "summary" | "payment" | "completed">("passengers");
  const [passengers, setPassengers] = useState<PassengerDetails[]>([]);
  const [bookingId, setBookingId] = useState("");
  
  // Calculate total amount with tax
  const totalAmount = passengers.length * flight.price * 1.18;
  
  const handlePassengerSubmit = (passengerData: PassengerDetails[]) => {
    setPassengers(passengerData);
    setCurrentStep("summary");
  };
  
  const handleBackToPassengers = () => {
    setCurrentStep("passengers");
  };
  
  const handleProceedToPayment = () => {
    setCurrentStep("payment");
  };
  
  const handleBackToSummary = () => {
    setCurrentStep("summary");
  };
  
  const handlePaymentSuccess = () => {
    // Generate a random booking ID
    const randomBookingId = "SRA" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    setBookingId(randomBookingId);
    setCurrentStep("completed");
    
    // Add to bookings in localStorage
    const newBooking = {
      id: randomBookingId,
      flight: flight,
      passengers: passengers,
      totalAmount: totalAmount,
      date: new Date().toISOString(),
    };
    
    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, newBooking]));
  };
  
  const handleCloseDialog = () => {
    // Reset state
    setCurrentStep("passengers");
    setPassengers([]);
    onClose();
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case "passengers":
        return <PassengerForm onSubmit={handlePassengerSubmit} />;
      case "summary":
        return (
          <BookingSummary 
            flight={{...flight, date: flight.date || new Date().toLocaleDateString()}} 
            passengers={passengers} 
            onConfirm={handleProceedToPayment}
            onBack={handleBackToPassengers}
          />
        );
      case "payment":
        return (
          <PaymentForm 
            amount={totalAmount} 
            onSuccess={handlePaymentSuccess}
            onBack={handleBackToSummary}
          />
        );
      case "completed":
        return (
          <TicketGenerator 
            flight={{...flight, date: flight.date || new Date().toLocaleDateString()}}
            passengers={passengers}
            bookingId={bookingId}
            totalAmount={totalAmount}
            onClose={handleCloseDialog}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
