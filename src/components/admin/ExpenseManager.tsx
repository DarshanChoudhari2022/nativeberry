
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus, Receipt, Calendar as CalendarIcon } from 'lucide-react';
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
}

export default function ExpenseManager() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: 'General' });
    const [date, setDate] = useState<Date | undefined>(new Date());
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

    const addExpense = async () => {
        if (!newExpense.description || !newExpense.amount) {
            toast.error("Please fill in description and amount");
            return;
        }

        setLoading(true);
        const { error } = await supabase.from('expenses').insert([{
            description: newExpense.description,
            amount: parseFloat(newExpense.amount),
            category: newExpense.category,
            date: date ? date.toISOString() : new Date().toISOString()
        }]);

        if (error) {
            console.error('Error adding expense:', error);
            toast.error('Failed to add expense');
        } else {
            toast.success('Expense added');
            setNewExpense({ description: '', amount: '', category: 'General' });
            setDate(new Date());
            fetchExpenses();
        }
        setLoading(false);
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

    const totalExpenses = expenses.reduce((sum, item) => sum + (item.amount || 0), 0);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <Receipt className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-800">Expense Manager</h2>
            </div>

            <Card className="border-purple-100 bg-purple-50/50">
                <CardHeader>
                    <CardTitle className="text-purple-900">Add New Expense</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row gap-4 items-end">
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
                    <div className="space-y-2 flex-[2] w-full">
                        <Label>Description</Label>
                        <Input
                            value={newExpense.description}
                            onChange={e => setNewExpense({ ...newExpense, description: e.target.value })}
                            placeholder="e.g. Petrol, Packaging, Maintenance"
                            className="bg-white"
                        />
                    </div>
                    <div className="space-y-2 w-full md:w-48">
                        <Label>Amount (₹)</Label>
                        <Input
                            type="number"
                            value={newExpense.amount}
                            onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
                            placeholder="0.00"
                            className="bg-white"
                        />
                    </div>
                    <Button onClick={addExpense} disabled={loading} className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto">
                        <Plus className="mr-2 h-4 w-4" /> Add Application
                    </Button>
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
                                            <TableCell>{expense.description}</TableCell>
                                            <TableCell className="font-medium">₹{expense.amount}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm" onClick={() => deleteExpense(expense.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
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
