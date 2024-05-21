import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { OrderColumn } from "./components/columns"
import { OrderClient } from "./components/client";


const dummyOrders = [
  {
    id: "1",
    phone: "123-456-7890",
    address: "123 Main St",
    orderItems: [
      {
        product: { name: "Product 1", price: 12900 },
      },
    ],
    isPaid: true,
    createdAt: new Date("2023-01-01T10:00:00Z"),
  },
  {
    id: "2",
    phone: "987-654-3210",
    address: "456 Elm St",
    orderItems: [
      {
        product: { name: "Product 3", price: 190990 },
      },
    ],
    isPaid: false,
    createdAt: new Date("2023-02-15T14:30:00Z"),
  },
  {
    id: "3",
    phone: "555-555-5555",
    address: "789 Oak St",
    orderItems: [
      {
        product: { name: "Product 4", price: 390990 },
      },
    ],
    isPaid: true,
    createdAt: new Date("2023-03-20T08:45:00Z"),
  },
];

const OrdersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedOrders: OrderColumn[] = dummyOrders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
      return total + Number(item.product.price)
    }, 0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
          <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
