import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import AdminLogin from '@/components/admin/AdminLogin';
import StatsOverview from '@/components/admin/StatsOverview';
import OrderEntryForm from '@/components/admin/OrderEntryForm';
import OrderList from '@/components/admin/OrderList';
import FarmerOrderSummary from '@/components/admin/FarmerOrderSummary';
import DeliveryManager from '@/components/admin/DeliveryManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, FilePlus, List, Sprout, Truck, AlertTriangle } from 'lucide-react';
import { Toaster as Sonner, toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CardContent } from "@/components/ui/card";
import ExpenseManager from '@/components/admin/ExpenseManager';
import PaymentRecovery from '@/components/admin/PaymentRecovery';
import { Receipt, IndianRupee } from 'lucide-react';
import SupplierManager from '@/components/admin/SupplierManager';
import { ArrowLeft, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HiddenDashboard = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [activeTab, setActiveTab] = useState('farmer');
    const [dbConnectionError, setDbConnectionError] = useState(false);

    // Stats State
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingDeliveries: 0,
        pendingPayments: 0,
        totalWeight: 0,
        totalRevenue: 0,
        pendingSupplierBalance: 0,
        totalExpenses: 0,
        netProfit: 0
    });

    useEffect(() => {
        const storedUser = sessionStorage.getItem('adminUser');
        if (storedUser) {
            setCurrentUser(storedUser);
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchStats();
        }
    }, [isAuthenticated, refreshTrigger]);

    const fetchStats = async () => {
        const { data: orders, error } = await supabase
            .from('orders')
            .select('*');

        if (error) {
            // Check if error is related to table not found
            if (error.code === '42P01') { // undefined_table
                setDbConnectionError(true);
            }
        } else if (orders) {
            setDbConnectionError(false);
            const totalOrders = orders.length;
            const pendingDeliveries = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
            const pendingPayments = orders.filter(o => o.payment_status === 'Pending' && o.status !== 'Cancelled').length;

            // Calculate Revenue (sum of total_amount column, handling nulls)
            const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);

            // Fetch total weight approx (or exact query if we wanted to be comprehensive)
            const { data: items } = await supabase.from('order_items').select('weight_kg');
            const totalWeight = items ? items.reduce((acc, curr) => acc + (curr.weight_kg || 0), 0) : 0;

            // Fetch supplier balance and calculate total cost
            const { data: supplierTxns } = await supabase.from('supplier_transactions').select('*');
            let pendingSupplierBalance = 0;
            let totalCost = 0;

            if (supplierTxns) {
                const nonSampleTxns = supplierTxns.filter(t => !t.is_sample);

                // Calculate Total Cost (all orders from suppliers)
                totalCost = nonSampleTxns.filter(t => t.type === 'Order').reduce((sum, t) => sum + (t.amount || 0), 0);

                // Calculate Peding Balance
                const totalPayable = totalCost; // Same as cost since all orders are payable
                const totalPaid = nonSampleTxns.filter(t => t.type === 'Payment').reduce((sum, t) => sum + (t.amount || 0), 0);
                pendingSupplierBalance = totalPayable - totalPaid;
            }

            // Fetch expenses
            const { data: expenses } = await supabase.from('expenses').select('amount');
            const totalExpenses = expenses ? expenses.reduce((sum, e) => sum + (e.amount || 0), 0) : 0;

            const netProfit = totalRevenue - totalCost - totalExpenses;

            setStats({ totalOrders, pendingDeliveries, pendingPayments, totalWeight, totalRevenue, pendingSupplierBalance, totalExpenses, netProfit });
        }
    };

    const handleLogin = (user: string) => {
        setCurrentUser(user);
        setIsAuthenticated(true);
        sessionStorage.setItem('adminUser', user);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentUser('');
        sessionStorage.removeItem('adminUser');
    };

    if (!isAuthenticated) {
        return <AdminLogin onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-red-100 selection:text-red-900" style={{ isolation: 'isolate' }}>
            {/* Header */}
            <div className="border-b bg-white sticky top-0 z-50 shadow-sm">
                <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto justify-between">
                    <div className="flex items-center gap-2 font-bold text-red-600 text-lg">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="-ml-2 hover:bg-red-50 text-red-700">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <LayoutDashboard className="h-6 w-6" />
                        <span>SUPPLY CHAIN ADMIN</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 hidden md:inline">
                            Welcome, <span className="font-semibold text-gray-900">{currentUser}</span>
                        </span>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            <main className="mx-auto max-w-7xl p-4 md:p-8 space-y-8">

                {/* Database Warning */}
                {dbConnectionError && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Database Setup Required</AlertTitle>
                        <AlertDescription>
                            The required tables ('orders', 'order_items') were not found in Supabase.
                            Please run the provided SQL schema in your Supabase SQL Editor to initialize the system.
                        </AlertDescription>
                    </Alert>
                )}

                <StatsOverview
                    {...stats}
                    onExpenseClick={() => setActiveTab('expenses')}
                />

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
                    <TabsList className="bg-white border w-full h-auto flex flex-wrap md:w-auto p-1 gap-1">
                        <TabsTrigger value="farmer" className="flex gap-2">
                            <LayoutDashboard className="h-4 w-4" /> Planning & Sales
                        </TabsTrigger>
                        <TabsTrigger value="new-order" className="flex gap-2">
                            <FilePlus className="h-4 w-4" /> New Order
                        </TabsTrigger>
                        <TabsTrigger value="orders-list" className="flex gap-2">
                            <List className="h-4 w-4" /> Master List
                        </TabsTrigger>
                        <TabsTrigger value="delivery" className="flex gap-2">
                            <Truck className="h-4 w-4" /> Delivery
                        </TabsTrigger>
                        <TabsTrigger value="supplier" className="flex gap-2">
                            <Store className="h-4 w-4" /> Gade Investment
                        </TabsTrigger>
                        <TabsTrigger value="expenses" className="flex gap-2">
                            <Receipt className="h-4 w-4" /> Expenses
                        </TabsTrigger>
                        <TabsTrigger value="recovery" className="flex gap-2 text-red-700 data-[state=active]:text-red-800">
                            <IndianRupee className="h-4 w-4" /> Recovery
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="new-order" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <OrderEntryForm
                                    currentUser={currentUser}
                                    onOrderCreated={() => {
                                        setRefreshTrigger(p => p + 1);
                                        toast.success("Dashboard updated!");
                                    }}
                                />
                            </div>
                            <div className="space-y-6 hidden lg:block">
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                                    <h3 className="font-semibold text-blue-900 mb-2">Distance Calculation</h3>
                                    <p className="text-sm text-blue-800 mb-4">
                                        Use the "Check Map" button to open Google Maps rooted at
                                        <strong> Lords Residency Wanawadi</strong>. Copy the kilometer value from Maps into the form.
                                    </p>
                                </div>
                                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
                                    <h3 className="font-semibold text-yellow-900 mb-2">Notice</h3>
                                    <p className="text-sm text-yellow-800">
                                        Verify "Payment Status" before dispatching. COD orders must be marked as "Pending".
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="delivery" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <DeliveryManager />
                    </TabsContent>

                    <TabsContent value="farmer" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <FarmerOrderSummary />
                    </TabsContent>

                    <TabsContent value="orders-list" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <CardContent className="bg-white p-6 rounded-lg border shadow-sm">
                            <OrderList refreshTrigger={refreshTrigger} />
                        </CardContent>
                    </TabsContent>

                    <TabsContent value="supplier" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <SupplierManager />
                    </TabsContent>

                    <TabsContent value="expenses" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ExpenseManager />
                    </TabsContent>

                    <TabsContent value="recovery" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <PaymentRecovery />
                    </TabsContent>
                </Tabs>
            </main>
            <Sonner position="top-right" theme="light" />
        </div>
    );
};

export default HiddenDashboard;
