import axios from 'axios';

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


export const eventBus = new EventBus('http://localhost:3000');
