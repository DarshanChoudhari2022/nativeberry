
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus, Receipt, Calendar as CalendarIcon, Pencil, X, User } from 'lucide-react';
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

interface Expense {
    id: number;
    description: string;
    amount: number;
    date: string;
    category?: string;
    spender?: string;
    is_waived?: boolean;
}

export default function ExpenseManager() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: 'General', spender: 'Darshan', is_waived: false });
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const { data, error } = await supabase
            .from('expenses')
            .select('*')
            .order('date', { ascending: false });

        if (error) {
            console.error('Error fetching expenses:', error);
        } else if (data) {
            setExpenses(data);
        }
    };

    const handleSaveExpense = async () => {
        if (!newExpense.description || !newExpense.amount) {
            toast.error("Please fill in description and amount");
            return;
        }

        setLoading(true);

        const expenseData = {
            description: newExpense.description,
            amount: newExpense.is_waived ? 0 : parseFloat(newExpense.amount),
            category: newExpense.category,
            spender: newExpense.spender,
            is_waived: newExpense.is_waived,
            date: date ? date.toISOString() : new Date().toISOString()
        };

        let error;

        if (editingId) {
            const { error: updateError } = await supabase
                .from('expenses')
                .update(expenseData)
                .eq('id', editingId);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('expenses')
                .insert([expenseData]);
            error = insertError;
        }

        if (error) {
            console.error('Error saving expense:', error);
            toast.error(editingId ? 'Failed to update expense' : 'Failed to add expense');
        } else {
            toast.success(editingId ? 'Expense updated' : 'Expense added');
            setNewExpense({ description: '', amount: '', category: 'General', spender: 'Darshan', is_waived: false });
            setDate(new Date());
            setEditingId(null);
            fetchExpenses();
        }
        setLoading(false);
    };

    const startEditing = (expense: Expense) => {
        setNewExpense({
            description: expense.description,
            amount: expense.amount.toString(),
            category: expense.category || 'General',
            spender: expense.spender || 'Darshan',
            is_waived: expense.is_waived || false
        });
        setDate(new Date(expense.date));
        setEditingId(expense.id);
    };

    const cancelEditing = () => {
        setNewExpense({ description: '', amount: '', category: 'General', spender: 'Darshan', is_waived: false });
        setDate(new Date());
        setEditingId(null);
    };

    const deleteExpense = async (id: number) => {
        const { error } = await supabase.from('expenses').delete().eq('id', id);
        if (error) {
            toast.error("Failed to delete expense");
        } else {
            toast.success('Expense deleted');
            fetchExpenses();
        }
    };

    const totalExpenses = expenses
        .filter(item => !item.is_waived)
        .reduce((sum, item) => sum + (item.amount || 0), 0);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <Receipt className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-800">Expense Manager</h2>
            </div>

            <Card className="border-purple-100 bg-purple-50/50">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-purple-900">{editingId ? 'Edit Expense' : 'Add New Expense'}</CardTitle>
                    {editingId && (
                        <Button variant="ghost" size="sm" onClick={cancelEditing} className="text-gray-500 hover:text-gray-700">
                            <X className="h-4 w-4 mr-1" /> Cancel
                        </Button>
                    )}
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="space-y-2 flex-1 w-full md:max-w-[200px]">
                            <Label className="flex items-center gap-2"><User className="h-3 w-3" /> Paid By</Label>
                            <Tabs
                                value={newExpense.spender}
                                onValueChange={(v) => setNewExpense({ ...newExpense, spender: v })}
                                className="w-full"
                            >
                                <TabsList className="grid grid-cols-3 w-full bg-white border">
                                    <TabsTrigger value="Darshan" className="text-xs py-1.5 data-[state=active]:bg-red-500 data-[state=active]:text-white">D</TabsTrigger>
                                    <TabsTrigger value="Suraj" className="text-xs py-1.5 data-[state=active]:bg-blue-500 data-[state=active]:text-white">S</TabsTrigger>
                                    <TabsTrigger value="Sushant" className="text-xs py-1.5 data-[state=active]:bg-green-500 data-[state=active]:text-white">S2</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        <div className="space-y-2 flex-1 w-full">
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
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="space-y-2 flex-[2] w-full">
                            <Label>Description</Label>
                            <Input
                                value={newExpense.description}
                                onChange={e => setNewExpense({ ...newExpense, description: e.target.value })}
                                placeholder="e.g. Petrol, Packaging, Maintenance"
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2 w-full md:w-32">
                            <Label>Amount (₹)</Label>
                            <Input
                                type="number"
                                value={newExpense.amount}
                                onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
                                placeholder="0.00"
                                disabled={newExpense.is_waived}
                                className={cn("bg-white font-bold", newExpense.is_waived && "opacity-50 line-through")}
                            />
                        </div>
                        <div className="space-y-2 pb-1">
                            <div className="flex items-center gap-2 px-3 py-2 bg-white border rounded-md h-10 shadow-sm">
                                <input
                                    type="checkbox"
                                    id="isWaivedExpense"
                                    checked={newExpense.is_waived}
                                    onChange={(e) => {
                                        setNewExpense({ ...newExpense, is_waived: e.target.checked });
                                        if (e.target.checked) setNewExpense(prev => ({ ...prev, amount: '0', is_waived: true }));
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                                />
                                <Label htmlFor="isWaivedExpense" className="text-xs cursor-pointer text-red-600 font-bold whitespace-nowrap">Waived Off</Label>
                            </div>
                        </div>
                        <Button onClick={handleSaveExpense} disabled={loading} className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto min-w-[140px]">
                            {editingId ? (
                                <> <Pencil className="mr-2 h-4 w-4" /> Update </>
                            ) : (
                                <> <Plus className="mr-2 h-4 w-4" /> Add Expense </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Expense History</CardTitle>
                    <div className="text-right">
                        <span className="text-sm text-gray-500">Total Expenses</span>
                        <div className="text-2xl font-bold text-purple-600">₹{totalExpenses.toLocaleString()}</div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Paid By</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="w-[100px]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {expenses.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                            No expenses recorded yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    expenses.map((expense) => (
                                        <TableRow key={expense.id}>
                                            <TableCell>{new Date(expense.date).toLocaleDateString('en-IN')}</TableCell>
                                            <TableCell>
                                                <span className={cn(
                                                    "px-2 py-1 rounded text-[10px] font-bold uppercase",
                                                    expense.spender === 'Darshan' ? "bg-red-100 text-red-700" :
                                                        expense.spender === 'Suraj' ? "bg-blue-100 text-blue-700" :
                                                            "bg-green-100 text-green-700"
                                                )}>
                                                    {expense.spender || 'Darshan'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    <span>{expense.description}</span>
                                                    {expense.is_waived && (
                                                        <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold w-fit">
                                                            WAIVED
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <span className={cn(expense.is_waived && "line-through text-gray-400")}>
                                                    ₹{expense.amount}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    <Button variant="ghost" size="sm" onClick={() => startEditing(expense)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" onClick={() => deleteExpense(expense.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
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
