"use client";
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaTrash, FaCheck, FaClock, FaRedo, FaChevronLeft, FaChevronRight, FaEnvelope, FaPhone, FaCalendar, FaTag, FaSpinner } from 'react-icons/fa';

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  service: string;
  status: string;
  createdAt: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  resolved: 'bg-green-100 text-green-800',
  follow: 'bg-blue-100 text-blue-800',
};

const statusIcons: Record<string, React.ReactNode> = {
  pending: <FaClock className="text-amber-600" />,
  resolved: <FaCheck className="text-green-600" />,
  follow: <FaRedo className="text-blue-600" />,
};

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [authCheck, setAuthCheck] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const fetchEnquiries = useCallback(async (page: number, status: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '10' });
      if (status) params.set('status', status);
      const res = await fetch(`/api/enquiries?${params}`);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      setEnquiries(data.enquiries);
      setPagination(data.pagination);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetch('/api/auth/me').then((r) => {
      if (r.status === 401) router.push('/admin/login');
      else setAuthCheck(false);
    });
  }, [router]);

  useEffect(() => {
    if (!authCheck) fetchEnquiries(pagination.page, statusFilter);
  }, [authCheck, pagination.page, statusFilter, fetchEnquiries]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    await fetch(`/api/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchEnquiries(pagination.page, statusFilter);
    setUpdatingId(null);
  };

  const deleteEnquiry = async (id: string) => {
    setDeletingId(id);
    await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
    fetchEnquiries(pagination.page, statusFilter);
    setDeletingId(null);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (authCheck) return null;

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-[#1e3a5a] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-zinc-300 text-sm">Manage Enquiries</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-sm hover:bg-white/20 transition-colors">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <button onClick={() => { setStatusFilter(''); setPagination((p) => ({ ...p, page: 1 })); }} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${!statusFilter ? 'bg-[#1e3a5a] text-white' : 'bg-white text-zinc-600 border border-zinc-200 hover:border-amber-400'}`}>All</button>
          {['pending', 'resolved', 'follow'].map((s) => (
            <button key={s} onClick={() => { setStatusFilter(s); setPagination((p) => ({ ...p, page: 1 })); }} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${statusFilter === s ? 'bg-[#1e3a5a] text-white' : 'bg-white text-zinc-600 border border-zinc-200 hover:border-amber-400'}`}>
              {statusIcons[s]} {s}
            </button>
          ))}
          <span className="text-sm text-zinc-400 ml-auto">{pagination.total} total</span>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-zinc-600 text-left">
                  <th className="px-5 py-4 font-semibold">Name</th>
                  <th className="px-5 py-4 font-semibold">Contact</th>
                  <th className="px-5 py-4 font-semibold">City</th>
                  <th className="px-5 py-4 font-semibold">Service</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {loading ? (
                  <tr><td colSpan={7} className="text-center py-20 text-zinc-400"><FaSpinner className="animate-spin mx-auto text-2xl mb-2" /> Loading...</td></tr>
                ) : enquiries.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-20 text-zinc-400">No enquiries found</td></tr>
                ) : enquiries.map((e, i) => (
                  <motion.tr
                    key={e._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-zinc-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-zinc-900">{e.name}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-0.5 text-zinc-500">
                        <span className="flex items-center gap-1.5"><FaEnvelope className="text-xs" /> {e.email}</span>
                        <span className="flex items-center gap-1.5"><FaPhone className="text-xs" /> {e.phone}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-zinc-500">{e.city || '—'}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1.5 text-zinc-700"><FaTag className="text-xs text-amber-500" /> {e.service}</span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-zinc-500 text-xs"><FaCalendar /> {new Date(e.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[e.status] || statusColors.pending}`}>
                        {statusIcons[e.status]} {e.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <select
                          value={e.status}
                          onChange={(ev) => updateStatus(e._id, ev.target.value)}
                          disabled={updatingId === e._id}
                          className="px-2 py-1.5 text-xs rounded-lg border border-zinc-200 outline-none focus:border-amber-400 bg-white font-semibold capitalize cursor-pointer text-black"
                        >
                          <option value="pending">Pending</option>
                          <option value="follow">Follow Up</option>
                          <option value="resolved">Resolved</option>
                        </select>
                        {deletingId === e._id ? (
                          <FaSpinner className="animate-spin text-red-400" />
                        ) : (
                          <button onClick={() => deleteEnquiry(e._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><FaTrash /></button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
              disabled={pagination.page <= 1}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-zinc-200 hover:border-amber-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FaChevronLeft /> Previous
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPagination((prev) => ({ ...prev, page: p }))}
                  className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${pagination.page === p ? 'bg-[#1e3a5a] text-white' : 'bg-white text-zinc-600 border border-zinc-200 hover:border-amber-400'}`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
              disabled={pagination.page >= pagination.totalPages}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-zinc-200 hover:border-amber-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
