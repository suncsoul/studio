"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const orderHistory = [
    { id: 'ORD-2023-001', date: "2023-01-15", customer: "Eleanor Vance", total: "₹1,299", status: 'Delivered' },
    { id: 'ORD-2023-002', date: "2023-03-22", customer: "Liam Gallagher", total: "₹3,499", status: 'Delivered' },
    { id: 'ORD-2023-003', date: "2023-06-01", customer: "Sophia Chen", total: "₹6,398", status: 'Processing' },
    { id: 'ORD-2023-004', date: "2023-09-10", customer: "Noah Patel", total: "₹2,899", status: 'Shipped' },
    { id: 'ORD-2023-005', date: "2024-01-05", customer: "Ava Williams", total: "₹4,599", status: 'Delivered' },
];

export default function OrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderHistory.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Badge variant={
                    order.status === 'Delivered' ? 'default' : 
                    order.status === 'Processing' ? 'secondary' : 'outline'
                  }>
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
