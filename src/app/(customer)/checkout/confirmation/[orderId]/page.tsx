import React from 'react';
import { orderService } from '@/services/orderService';
import { Container } from '@/components/ui/Container';
import { ConfirmationClient } from './ConfirmationClient';

interface Props {
  params: Promise<{ orderId: string }>;
}

export default async function OrderConfirmationPage({ params }: Props) {
  const resolvedParams = await params;
  const orderId = resolvedParams?.orderId;
  const initialOrder = orderId ? await orderService.getOrderById(orderId) : null;

  return (
    <div className="py-14 bg-ivory-100 min-h-screen print:bg-white print:py-0">
      <Container>
        <ConfirmationClient initialOrder={initialOrder} orderId={orderId} />
      </Container>
    </div>
  );
}
