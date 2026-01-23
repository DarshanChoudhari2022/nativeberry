
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus, Calendar as CalendarIcon, IndianRupee, Store, Pencil, X, User, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    delivered_qty: number;
    amount: number;
    is_sample: boolean;
    is_waived: boolean;
    spender: string;
    notes?: string;
}

export default function SupplierManager() {
    const [transactions, setTransactions] = useState<SupplierTransaction[]>([]);
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [type, setType] = useState<'Order' | 'Payment'>('Order');
    const [quantity, setQuantity] = useState('');
    const [deliveredQty, setDeliveredQty] = useState('');
    const [isSample, setIsSample] = useState(false);
    const [isWaived, setIsWaived] = useState(false);
    const [spender, setSpender] = useState('Darshan');
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
            delivered_qty: type === 'Order' ? parseFloat(deliveredQty || '0') : 0,
            amount: parseFloat(amount || '0'),
            is_sample: isSample,
            is_waived: isWaived,
            spender: spender
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
        setDeliveredQty('');
        setIsSample(false);
        setIsWaived(false);
        setSpender('Darshan');
        setAmount('');
        setDescription('');
    };

    const startEditing = (txn: SupplierTransaction) => {
        setEditingId(txn.id);
        setDate(new Date(txn.date));
        setType(txn.type);
        setQuantity(txn.quantity_kg > 0 ? txn.quantity_kg.toString() : '');
        setDeliveredQty(txn.delivered_qty > 0 ? txn.delivered_qty.toString() : '');
        setIsSample(txn.is_sample || false);
        setIsWaived(txn.is_waived || false);
        setSpender(txn.spender || 'Darshan');
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
    const nonSampleTransactions = transactions.filter(t => !t.is_sample && !t.is_waived);
    const totalOrderedKg = nonSampleTransactions.filter(t => t.type === 'Order').reduce((sum, t) => sum + (t.quantity_kg || 0), 0);
    const totalPayable = nonSampleTransactions.filter(t => t.type === 'Order').reduce((sum, t) => sum + (t.amount || 0), 0);
    const totalPaid = nonSampleTransactions.filter(t => t.type === 'Payment').reduce((sum, t) => sum + (t.amount || 0), 0);
    const pendingBalance = totalPayable - totalPaid;

    // Investment Return Logic
    const personWiseInvestment = transactions
        .filter(t => t.type === 'Payment' && !t.is_waived && !t.is_sample)
        .reduce((acc, t) => {
            const key = t.spender || 'Darshan';
            acc[key] = (acc[key] || 0) + (t.amount || 0);
            return acc;
        }, {} as Record<string, number>);

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
                        <CardTitle className="text-blue-900 text-sm font-medium">Total Investment</CardTitle>
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
                            Pending to Gade
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={cn("text-2xl font-bold", pendingBalance > 0 ? "text-red-700" : "text-gray-700")}>
                            ₹{pendingBalance.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-slate-200">
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
                    <CardContent className="space-y-6 bg-slate-50/50 p-6 rounded-b-lg">
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="space-y-2 flex-1 w-full md:max-w-[150px]">
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

                            <div className="space-y-2 flex-1 w-full">
                                <Label>Transaction Type</Label>
                                <Select value={type} onValueChange={(v: any) => setType(v)}>
                                    <SelectTrigger className="bg-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Order">Buy Stock (Investment)</SelectItem>
                                        <SelectItem value="Payment">Pay Gade</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {type === 'Payment' && (
                                <div className="space-y-2 flex-1 w-full md:max-w-[200px]">
                                    <Label className="flex items-center gap-2"><User className="h-3 w-3" /> Who invested?</Label>
                                    <Tabs value={spender} onValueChange={setSpender} className="w-full">
                                        <TabsList className="grid grid-cols-3 w-full bg-white border h-9">
                                            <TabsTrigger value="Darshan" className="text-xs data-[state=active]:bg-red-500 data-[state=active]:text-white">D</TabsTrigger>
                                            <TabsTrigger value="Suraj" className="text-xs data-[state=active]:bg-blue-500 data-[state=active]:text-white">S</TabsTrigger>
                                            <TabsTrigger value="Sushant" className="text-xs data-[state=active]:bg-green-500 data-[state=active]:text-white">S2</TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            {type === 'Order' && (
                                <>
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
                                    <div className="space-y-2 w-full md:w-32">
                                        <Label>Delivered (Kg)</Label>
                                        <Input
                                            type="number"
                                            value={deliveredQty}
                                            onChange={e => setDeliveredQty(e.target.value)}
                                            placeholder="0"
                                            className="bg-white border-green-200"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="space-y-2 w-full md:w-32">
                                <Label>{type === 'Order' ? 'Investment (₹)' : 'Paid Amount (₹)'}</Label>
                                <Input
                                    type="number"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    placeholder="0"
                                    disabled={isWaived}
                                    className={cn("bg-white font-semibold", isWaived && "opacity-50 line-through")}
                                />
                            </div>

                            <div className="space-y-2 flex-1 w-full">
                                <Label>Notes</Label>
                                <div className="flex gap-2 items-center">
                                    <Input
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        placeholder={type === 'Order' ? "e.g. Morning Batch" : "e.g. UPI to Gade"}
                                        className="bg-white"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 px-2 py-1 bg-white border rounded-md min-w-[110px]">
                                            <input
                                                type="checkbox"
                                                id="isSample"
                                                checked={isSample}
                                                onChange={(e) => setIsSample(e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                                            />
                                            <Label htmlFor="isSample" className="text-[10px] cursor-pointer">Is Sample</Label>
                                        </div>
                                        <div className="flex items-center gap-2 px-2 py-1 bg-white border rounded-md min-w-[110px]">
                                            <input
                                                type="checkbox"
                                                id="isWaivedInput"
                                                checked={isWaived}
                                                onChange={(e) => {
                                                    setIsWaived(e.target.checked);
                                                }}
                                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                                            />
                                            <Label htmlFor="isWaivedInput" className="text-[10px] cursor-pointer text-red-600 font-bold">Waived Off</Label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button onClick={handleSaveTransaction} disabled={loading} className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto min-w-[120px]">
                                {editingId ? (
                                    <><Pencil className="mr-2 h-4 w-4" /> Update</>
                                ) : (
                                    <><Plus className="mr-2 h-4 w-4" /> Save</>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 text-white border-none shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <IndianRupee className="h-5 w-5 text-yellow-500" />
                            Investment Returns
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-xs text-slate-400">Total money to be returned to investors once sales revenue is recovered.</p>
                        <div className="space-y-3">
                            {Object.entries({ 'Darshan': 0, 'Suraj': 0, 'Sushant': 0, ...personWiseInvestment }).map(([person, amount]) => (
                                <div key={person} className="flex justify-between items-center p-3 bg-slate-800 rounded-lg border border-slate-700 transition-all hover:bg-slate-750">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs",
                                            person === 'Darshan' ? "bg-red-500/20 text-red-400" :
                                                person === 'Suraj' ? "bg-blue-500/20 text-blue-400" :
                                                    "bg-green-500/20 text-green-400"
                                        )}>
                                            {person.charAt(0)}
                                        </div>
                                        <span className="font-medium text-slate-300">{person}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold">₹{amount.toLocaleString()}</div>
                                        <div className="text-[10px] text-slate-500">To be returned</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Gade Investment History</CardTitle>
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
                                    <TableHead className="text-right">Yield Info</TableHead>
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
                                                <div className="flex flex-col gap-1">
                                                    <span className={cn(
                                                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase w-fit",
                                                        txn.type === 'Order' ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"
                                                    )}>
                                                        {txn.type === 'Order' ? 'Investment' : 'Payment Out'}
                                                    </span>
                                                    {txn.is_waived && (
                                                        <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase w-fit flex items-center gap-1">
                                                            <CheckCircle2 size={10} /> WAIVED
                                                        </span>
                                                    )}
                                                    {txn.is_sample && (
                                                        <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase w-fit">
                                                            SAMPLE
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{txn.description}</TableCell>
                                            <TableCell className="text-right">
                                                {txn.type === 'Order' ? txn.quantity_kg : '-'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {txn.type === 'Order' ? (
                                                    <div className="text-xs space-y-1">
                                                        <div className="font-medium text-green-700">Delivered: {txn.delivered_qty || 0} kg</div>
                                                        <div className="text-red-600">
                                                            Loss: {(txn.quantity_kg - (txn.delivered_qty || 0)).toFixed(1)} kg
                                                            ({(((txn.quantity_kg - (txn.delivered_qty || 0)) / txn.quantity_kg) * 100 || 0).toFixed(1)}%)
                                                        </div>
                                                    </div>
                                                ) : '-'}
                                            </TableCell>
                                            <TableCell className="text-right font-semibold">
                                                <div className="flex flex-col items-end">
                                                    <span className={cn(
                                                        (txn.is_sample || txn.is_waived) && "line-through text-gray-400"
                                                    )}>
                                                        ₹{txn.amount.toLocaleString()}
                                                    </span>
                                                    {txn.is_waived && <span className="text-[9px] text-red-500 font-bold uppercase">Waived</span>}
                                                    {txn.is_sample && !txn.is_waived && <span className="text-[9px] text-purple-500 font-bold uppercase">Sample</span>}
                                                </div>
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
