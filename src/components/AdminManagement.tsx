import React, { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';
import { UserCheck, Trash2, Plus, AlertCircle, Key, Mail, User, ShieldAlert, Clipboard, Check } from 'lucide-react';
import { auth } from '../lib/firebase';

interface AdminUser {
  uid: string;
  email: string;
  name?: string;
  addedAt?: any;
}

export const AdminManagement = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [newUid, setNewUid] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [saving, setSaving] = useState(false);
  const [copiedUid, setCopiedUid] = useState<string | null>(null);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getAdmins();
      setAdmins(data || []);
    } catch (err: any) {
      console.error("Failed to load admins list:", err);
      setError("Unable to retrieve administrators list. Please make sure you have active permissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUid.trim() || !newEmail.trim()) {
      setError("Both User ID (UID) and Email are required properties.");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      await adminService.addAdmin(newUid.trim(), newEmail.trim(), newName.trim());
      
      setSuccess(`Successfully added ${newEmail} as an administrator.`);
      setNewUid('');
      setNewEmail('');
      setNewName('');
      await fetchAdmins();
    } catch (err: any) {
      console.error("Add admin failed:", err);
      setError("Failed to register admin. Verify your connectivity and permissions.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAdmin = async (uid: string, email: string) => {
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.uid === uid) {
      alert("Self-removal warning: You cannot remove your own administrator privilege while logged in.");
      return;
    }

    if (!window.confirm(`Are you sure you want to remove admin access for ${email}?`)) {
      return;
    }

    try {
      setError(null);
      setSuccess(null);
      await adminService.deleteAdmin(uid);
      setSuccess(`Successfully revoked administrator access for ${email}.`);
      await fetchAdmins();
    } catch (err: any) {
      console.error("Delete admin failed:", err);
      setError("Failed to revoke administrator access.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUid(text);
    setTimeout(() => setCopiedUid(null), 2000);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Overview Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-brand-warm-cream p-8">
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-blue-50 text-[#2368D6] rounded-xl">
            <UserCheck size={28} />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-[#081A33] mb-2">Manage Administrator Privileges</h2>
            <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
              Define which users should have read, write, edit, and delete access. Adhering to OrbitSol's secure database policies, these accounts will receive full database permissions in Cloud Firestore and complete dashboard control.
            </p>
          </div>
        </div>
      </div>

      {notificationDisplay(error, success)}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Current Admins list */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-brand-warm-cream overflow-hidden">
          <div className="border-b border-brand-warm-cream bg-brand-cream/50 px-8 py-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Administrators</h3>
          </div>
          
          {loading ? (
            <div className="p-12 text-center text-slate-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2368D6] mx-auto mb-4"></div>
              Loading admins...
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {admins.map((adm) => (
                <div key={adm.uid} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="space-y-1 pr-4 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-brand-deep-navy text-sm block truncate">
                        {adm.name || "Unnamed Administrator"}
                      </span>
                      {auth.currentUser?.uid === adm.uid && (
                        <span className="px-2 py-0.5 bg-blue-50 text-[#2368D6] text-[9px] font-bold uppercase rounded font-mono tracking-wider">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-slate-500 text-xs flex items-center gap-1">
                      <Mail size={12} className="text-slate-400" />
                      <span>{adm.email}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2 font-mono">
                      <span>UID: <span className="select-all bg-slate-100 px-1 py-0.5 rounded">{adm.uid}</span></span>
                      <button 
                        onClick={() => copyToClipboard(adm.uid)} 
                        className="text-slate-400 hover:text-[#2368D6] transition-colors"
                        title="Copy UID to clipboard"
                      >
                        {copiedUid === adm.uid ? <Check size={12} className="text-green-500" /> : <Clipboard size={12} />}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteAdmin(adm.uid, adm.email)}
                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Revoke Admin Access"
                    disabled={auth.currentUser?.uid === adm.uid}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              
              {admins.length === 0 && (
                <div className="p-12 text-center text-slate-400 italic text-sm">
                  No registered database admins found. Default hardcoded developers have emergency access.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Add new admin form */}
        <div className="bg-white rounded-2xl shadow-sm border border-brand-warm-cream p-8 self-start space-y-6">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#081A33] mb-2">Add New Administrator</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Registering a user creates an authorization document inside Cloud Firestore securely under the <code className="bg-slate-100 p-0.5 rounded px-1 text-[11px] font-mono">admins</code> collection.
            </p>
          </div>

          <form onSubmit={handleAddAdmin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Firebase User ID (UID)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Key size={14} />
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. jX9sFA9ptlH..."
                  value={newUid}
                  onChange={(e) => setNewUid(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2368D6]/10 focus:border-[#2368D6] transition-all"
                />
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">
                Each Google Auth account gets a unique UID. When users log in and see Access Denied, their UID is shown for copy-pasting.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Mail size={14} />
                </span>
                <input
                  type="email"
                  required
                  placeholder="name@orbitsol.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2368D6]/10 focus:border-[#2368D6] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Name (Optional)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <User size={14} />
                </span>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2368D6]/10 focus:border-[#2368D6] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#2368D6] hover:opacity-95 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              {saving ? "Registering..." : "Add Administrator"}
            </button>
          </form>

          {/* Secure notification banner */}
          <div className="bg-[#FFF9F2] border border-[#FFE7CC] p-4 rounded-xl flex gap-3 text-amber-700">
            <ShieldAlert size={18} className="flex-shrink-0 mt-0.5 text-amber-600" />
            <div className="text-xs leading-normal">
              <span className="font-bold">Database Security Notice:</span> Adding a user here executes immediately inside Cloud Firestore. After adding, the user can instantly read and edit pages or view enquiries.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function notificationDisplay(error: string | null, success: string | null) {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3 text-sm">
        <AlertCircle size={18} className="text-red-500" />
        <span>{error}</span>
      </div>
    );
  }
  if (success) {
    return (
      <div className="bg-green-50 border border-green-100 text-green-700 px-6 py-4 rounded-xl flex items-center gap-3 text-sm">
        <UserCheck size={18} className="text-green-500" />
        <span>{success}</span>
      </div>
    );
  }
  return null;
}
