import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export interface DomainEvent {
  type: string;
  payload: any;
}

class EventBus {
  constructor(private queryServiceUrl: string) {}

  async publish(type: string, payload: any): Promise<void> {
    const event: DomainEvent = { type, payload };

    try {
      await axios.post(`${this.queryServiceUrl}/events`, event);
    } catch (err) {
      console.log('Failed to deliver event:', type);
    }
  }
}


const eventBus = new EventBus(process.env.VITE_API_URL as string);
export default eventBus;
