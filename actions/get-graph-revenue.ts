import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (storeId: string): Promise<GraphData[]> => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  // Grouping the orders by month and summing the revenue
  for (const order of paidOrders) {
    const month = order.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ...
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }

    // Adding the revenue for this order to the respective month
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Jan", total: 100000 },
    { name: "Feb", total: 70000 },
    { name: "Mar", total: 60000 },
    { name: "Apr", total: 50000 },
    { name: "May", total: 110000 },
    { name: "Jun", total: 20000 },
    { name: "Jul", total: 90000 },
    { name: "Aug", total: 90000 },
    { name: "Sep", total: 70000 },
    { name: "Oct", total: 20000 },
    { name: "Nov", total: 150000 },
    { name: "Dec", total: 130000 },
  ];

  // Filling in the revenue data
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
