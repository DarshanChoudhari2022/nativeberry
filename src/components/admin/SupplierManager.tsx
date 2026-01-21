
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus, Calendar as CalendarIcon, IndianRupee, Store, Pencil, X } from 'lucide-react';
import { toast } from 'sonner';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface SupplierTransaction {
    id: number;
    date: string;
    type: 'Order' | 'Payment';
    description: string;
    quantity_kg: number;
    amount: number;
    notes?: string;
}

export default function SupplierManager() {
    const [transactions, setTransactions] = useState<SupplierTransaction[]>([]);
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [type, setType] = useState<'Order' | 'Payment'>('Order');
    const [quantity, setQuantity] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        const { data, error } = await supabase
            .from('supplier_transactions')
            .select('*')
            .order('date', { ascending: false });

        if (error) {
            console.error('Error fetching transactions:', error);
            // Don't show toast on initial load error if table doesn't exist yet
        } else if (data) {
            setTransactions(data);
        }
    };

    const handleSaveTransaction = async () => {
        if (!date) {
            toast.error("Please select a date");
            return;
        }

        if (type === 'Order' && !quantity) {
            toast.error("Please enter quantity (kg) for order");
            return;
        }

        if (type === 'Payment' && !amount) {
            toast.error("Please enter amount for payment");
            return;
        }

        setLoading(true);

        const transactionData = {
            date: date.toISOString(),
            type,
            description: description || (type === 'Order' ? `Order: ${quantity}kg` : 'Payment to Gade'),
            quantity_kg: type === 'Order' ? parseFloat(quantity || '0') : 0,
            amount: parseFloat(amount || '0'), // Amount is cost for Order, or paid amount for Payment
        };

        let result;
        if (editingId) {
            result = await supabase
                .from('supplier_transactions')
                .update(transactionData)
                .eq('id', editingId);
        } else {
            result = await supabase
                .from('supplier_transactions')
                .insert([transactionData]);
        }

        const { error } = result;

        if (error) {
            console.error('Error saving transaction:', error);
            toast.error(editingId ? 'Failed to update' : 'Failed to save');
        } else {
            toast.success(editingId ? 'Updated successfully' : 'Saved successfully');
            resetForm();
            fetchTransactions();
        }
        setLoading(false);
    };

    const resetForm = () => {
        setEditingId(null);
        setDate(new Date());
        setType('Order');
        setQuantity('');
        setAmount('');
        setDescription('');
    };

    const startEditing = (txn: SupplierTransaction) => {
        setEditingId(txn.id);
        setDate(new Date(txn.date));
        setType(txn.type);
        setQuantity(txn.quantity_kg > 0 ? txn.quantity_kg.toString() : '');
        setAmount(txn.amount.toString());
        setDescription(txn.description);
    };

    const deleteTransaction = async (id: number) => {
        if (!confirm("Are you sure you want to delete this record?")) return;

        const { error } = await supabase.from('supplier_transactions').delete().eq('id', id);
        if (error) {
            toast.error("Failed to delete");
        } else {
            toast.success('Deleted successfully');
            fetchTransactions();
        }
    };

    // Stats Calculation
    const totalOrderedKg = transactions.filter(t => t.type === 'Order').reduce((sum, t) => sum + (t.quantity_kg || 0), 0);
    const totalPayable = transactions.filter(t => t.type === 'Order').reduce((sum, t) => sum + (t.amount || 0), 0);
    const totalPaid = transactions.filter(t => t.type === 'Payment').reduce((sum, t) => sum + (t.amount || 0), 0);
    const pendingBalance = totalPayable - totalPaid;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-orange-50 border-orange-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-orange-900 text-sm font-medium">Total Ordered (Kg)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-700">{totalOrderedKg.toFixed(1)} kg</div>
                    </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-blue-900 text-sm font-medium">Total Bill Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-700">₹{totalPayable.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-green-900 text-sm font-medium">Total Paid</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">₹{totalPaid.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className={cn("border-2", pendingBalance > 0 ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200")}>
                    <CardHeader className="pb-2">
                        <CardTitle className={cn("text-sm font-medium", pendingBalance > 0 ? "text-red-900" : "text-gray-900")}>
                            Pending Balance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={cn("text-2xl font-bold", pendingBalance > 0 ? "text-red-700" : "text-gray-700")}>
                            ₹{pendingBalance.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-slate-900 flex gap-2 items-center">
                        <Store className="h-5 w-5 text-purple-600" />
                        {editingId ? 'Edit Record' : 'Add Gade Transaction'}
                    </CardTitle>
                    {editingId && (
                        <Button variant="ghost" size="sm" onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                            <X className="h-4 w-4 mr-1" /> Cancel
                        </Button>
                    )}
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row gap-4 items-end bg-slate-50 p-4 rounded-lg">
                    <div className="space-y-2 w-full md:w-auto min-w-[150px]">
                        <Label>Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal bg-white",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    className="bg-white"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2 w-full md:w-auto min-w-[140px]">
                        <Label>Type</Label>
                        <Select value={type} onValueChange={(v: any) => setType(v)}>
                            <SelectTrigger className="bg-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Order">Receive Stock (Order)</SelectItem>
                                <SelectItem value="Payment">Make Payment</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {type === 'Order' && (
                        <div className="space-y-2 w-full md:w-32">
                            <Label>Quantity (Kg)</Label>
                            <Input
                                type="number"
                                value={quantity}
                                onChange={e => setQuantity(e.target.value)}
                                placeholder="0"
                                className="bg-white"
                            />
                        </div>
                    )}

                    <div className="space-y-2 w-full md:w-32">
                        <Label>{type === 'Order' ? 'Total Cost (₹)' : 'Paid Amount (₹)'}</Label>
                        <Input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            placeholder="0"
                            className="bg-white font-semibold"
                        />
                    </div>

                    <div className="space-y-2 flex-1 w-full">
                        <Label>Description/Notes</Label>
                        <Input
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder={type === 'Order' ? "e.g. Morning Batch" : "e.g. UPI/Cash to Gade"}
                            className="bg-white"
                        />
                    </div>

                    <Button onClick={handleSaveTransaction} disabled={loading} className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto min-w-[120px]">
                        {editingId ? (
                            <><Pencil className="mr-2 h-4 w-4" /> Update</>
                        ) : (
                            <><Plus className="mr-2 h-4 w-4" /> Save</>
                        )}
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">Qty (Kg)</TableHead>
                                    <TableHead className="text-right">Amount (₹)</TableHead>
                                    <TableHead className="w-[100px]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                            No transactions recorded yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    transactions.map((txn) => (
                                        <TableRow key={txn.id}>
                                            <TableCell>{new Date(txn.date).toLocaleDateString('en-IN')}</TableCell>
                                            <TableCell>
                                                <span className={cn(
                                                    "px-2 py-1 rounded text-xs font-medium",
                                                    txn.type === 'Order' ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"
                                                )}>
                                                    {txn.type === 'Order' ? 'Stock In' : 'Payment Out'}
                                                </span>
                                            </TableCell>
                                            <TableCell>{txn.description}</TableCell>
                                            <TableCell className="text-right">
                                                {txn.type === 'Order' ? txn.quantity_kg : '-'}
                                            </TableCell>
                                            <TableCell className="text-right font-semibold">
                                                ₹{txn.amount.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    <Button variant="ghost" size="sm" onClick={() => startEditing(txn)} className="text-blue-500 hover:text-blue-700">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" onClick={() => deleteTransaction(txn.id)} className="text-red-500 hover:text-red-700">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
