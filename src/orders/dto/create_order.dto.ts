export class createOrderDTO {
  user_id: string;
  contact_id: string;
  total_amount: number;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
}
