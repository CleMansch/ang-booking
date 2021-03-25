//define model
export interface Appointment {
    _id: string;
    //mongoDB stores dates as string
    appointmentDate: string;
    name: string;
    email: string;
  }
  