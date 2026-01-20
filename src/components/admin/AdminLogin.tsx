import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

interface AdminLoginProps {
    onLogin: (user: string) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulating a secure login for this demo
        // In production, use Supabase Auth
        setTimeout(() => {
            // Hardcoded credentials for the 3 salespersons + Admin
            const validUsers = ['Darshan', 'Suraj', 'Sushant', 'Admin'];

            if (validUsers.includes(username) && password === 'nativeberry123') {
                toast.success(`Welcome back, ${username}!`);
                onLogin(username);
            } else {
                toast.error('Invalid credentials');
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
            <Card className="w-full max-w-md shadow-xl border-red-100 bg-white/80 backdrop-blur-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto bg-red-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                        <Lock className="w-6 h-6 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-red-900">Supply Chain Admin</CardTitle>
                    <CardDescription>Enter your credentials to access the dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="text"
                                placeholder="Username (e.g. Darshan)"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="bg-white/50 border-red-200 focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-white/50 border-red-200 focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Authenticating...' : 'Login'}
                        </Button>
                        <div className="text-xs text-center text-gray-500 mt-4">
                            Authorized Personnel Only
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLogin;
