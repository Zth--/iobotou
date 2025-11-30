'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import {
    LogOut,
    User,
    Key,
    Globe,
    ExternalLink,
    Copy,
    Check,
    Search,
    Plus,
    LayoutGrid,
    Settings,
    Bell
} from 'lucide-react'

// Mock data for demonstration until DB is connected
const MOCK_ACCOUNTS = [
    { id: 1, service: 'el wizardo', username: 'leouy1522', password: 'manchita1520', type: 'ARPI', color: 'from-orange-400 to-red-500' },
    { id: 2, service: '5381', username: 'mmr_v054', password: 'whocareas123', type: 'MAX', color: 'from-orange-400 to-red-500' }
]

const MOCK_LINKS = [
    { id: 1, title: 'Design System', url: 'https://figma.com', description: 'Main design file' },
    { id: 2, title: 'API Docs', url: 'https://swagger.io', description: 'Backend documentation' },
    { id: 3, title: 'Jira Board', url: 'https://jira.com', description: 'Sprint tracking' },
]

export default function Dashboard() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [copiedId, setCopiedId] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                // router.push('/') // Commented out for demo purposes
                setUser({ email: 'demo@user.com' })
            } else {
                setUser(session.user)
            }
            setLoading(false)
        }

        checkUser()
    }, [router])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    const copyToClipboard = (text: string, id: number) => {
        navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505]">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )

    return (
        <div className="min-h-screen flex bg-[#050505] text-white selection:bg-indigo-500/30 font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 flex-shrink-0 hidden md:flex flex-col bg-[#0a0a0a]">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <LayoutGrid className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight leading-tight">Iobotou<br /></span>
                    </div>

                    <nav className="space-y-1">
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500">
                            <LayoutGrid className="w-5 h-5" />
                            smurfs
                        </button>
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-white/5">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                            {user?.email?.[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate group-hover:text-indigo-300 transition-colors">{user?.email || 'demo@user.com'}</p>
                            <p className="text-xs text-gray-500">Admin</p>
                        </div>
                        <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-screen bg-[#050505]">
                <div className="max-w-7xl mx-auto p-8 lg:p-12">

                    {/* Mobile Header */}
                    <div className="md:hidden flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <LayoutGrid className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight">Backoffice</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
                                <span className="text-indigo-500">$</span>
                                smurfs
                            </h1>
                            <p className="text-gray-400 text-lg">pim pum pam.</p>
                        </div>
                        <button className="btn btn-primary whitespace-nowrap shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30">
                            <Plus className="w-5 h-5 mr-2" />
                            Add Account
                        </button>
                    </header>

                    {/* Search and Filter */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="relative flex-1 max-w-md group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search accounts..."
                                className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-gray-600"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Accounts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {MOCK_ACCOUNTS.filter(acc => acc.service.toLowerCase().includes(searchQuery.toLowerCase())).map((account) => (
                            <div key={account.id} className="group bg-[#0f0f0f] border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 relative overflow-hidden">
                                {/* Subtle gradient background on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${account.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                                <div className="flex items-start justify-between mb-6 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${account.color} flex items-center justify-center text-xl font-bold text-white shadow-lg`}>
                                            {account.service[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">{account.service}</h3>
                                            <span className="text-xs text-gray-500 font-medium">{account.type}</span>
                                        </div>
                                    </div>
                                    <button className="text-gray-600 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="space-y-3 relative z-10">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5 group-hover:border-white/10 transition-colors">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <User className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-300 truncate font-medium">{account.username}</span>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(account.username, account.id * 10)}
                                            className="text-gray-600 hover:text-indigo-400 transition-colors"
                                        >
                                            {copiedId === account.id * 10 ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5 group-hover:border-white/10 transition-colors">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <Key className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-300 font-mono tracking-wider">••••••••••••</span>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(account.password, account.id * 10 + 1)}
                                            className="text-gray-600 hover:text-indigo-400 transition-colors"
                                        >
                                            {copiedId === account.id * 10 + 1 ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Links Section */}
                    <section>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                            <Globe className="w-5 h-5 text-indigo-400" />
                            Important Links
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {MOCK_LINKS.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-5 rounded-2xl bg-[#0f0f0f] border border-white/5 hover:border-indigo-500/30 hover:bg-white/5 transition-all group hover:-translate-y-1"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{link.title}</h3>
                                        <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <p className="text-sm text-gray-500">{link.description}</p>
                                </a>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
