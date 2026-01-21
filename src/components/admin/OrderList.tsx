import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Loader2, CheckCircle, Truck, XCircle, Calendar } from "lucide-react";
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Order {
    id: number;
    created_at: string;
    customer_name: string;
    customer_address: string;
    status: string;
    payment_status: string;
    salesperson: string;
    distance_km: number;
    delivery_boy: string | null;
    delivery_date: string | null;
    delivery_notes: string;
    total_amount: number;
}

const OrderList = ({ refreshTrigger }: { refreshTrigger: number }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, [refreshTrigger]);

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching orders:', error);
        } else {
            setOrders(data || []);
        }
        setLoading(false);
    };

    const updateStatus = async (id: number, newStatus: string) => {
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            toast.error("Failed to update status");
        } else {
            toast.success(`Order #${id} marked as ${newStatus}`);
            fetchOrders();
        }
    };

    const updatePayment = async (id: number, newPaymentStatus: string) => {
        const { error } = await supabase
            .from('orders')
            .update({ payment_status: newPaymentStatus })
            .eq('id', id);

        if (error) {
            toast.error("Failed to update payment");
        } else {
            toast.success(`Order #${id} payment updated to ${newPaymentStatus}`);
            fetchOrders();
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Delivered':
                return <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>;
            case 'Out for Delivery':
                return <Badge className="bg-blue-500 hover:bg-blue-600">On The Way</Badge>;
            case 'Cancelled':
                return <Badge variant="destructive">Cancelled</Badge>;
            default:
                return <Badge variant="secondary">Pending</Badge>;
        }
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="rounded-md border bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <Table className="min-w-[800px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Salesperson</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24 text-gray-500">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium text-gray-900">#{order.id}</TableCell>
                                    <TableCell>
                                        {order.delivery_date ? (
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <Calendar className="h-3 w-3" />
                                                {format(new Date(order.delivery_date), 'MMM d')}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400">Unscheduled</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-900">{order.customer_name}</span>
                                            <span className="text-xs text-gray-500 truncate max-w-[200px]" title={order.customer_address}>
                                                {order.customer_address}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-900">{order.salesperson}</TableCell>
                                    <TableCell className="font-semibold text-gray-900">
                                        {order.total_amount ? `₹${order.total_amount.toLocaleString()}` : '-'}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                                    <TableCell>
                                        <Badge className={order.payment_status === 'Paid'
                                            ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100'
                                            : 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100'
                                        }>
                                            {order.payment_status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-white text-gray-900">
                                                <DropdownMenuLabel>Update Order</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => updateStatus(order.id, 'Out for Delivery')}>
                                                    <Truck className="mr-2 h-4 w-4" /> Mark Out for Delivery
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateStatus(order.id, 'Delivered')}>
                                                    <CheckCircle className="mr-2 h-4 w-4" /> Mark Delivered
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updateStatus(order.id, 'Cancelled')}>
                                                    <XCircle className="mr-2 h-4 w-4" /> Cancel Order
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuLabel>Payment</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => updatePayment(order.id, 'Paid')}>
                                                    Mark as Paid
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => updatePayment(order.id, 'Pending')}>
                                                    Mark as Pending
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default OrderList;
