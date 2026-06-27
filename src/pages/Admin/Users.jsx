import { useState } from "react";
import {
  Search,
  Filter,
  UserPlus,
  Shield,
  UserCheck,
  UserX,
  Mail,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";

function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // Dữ liệu mẫu (Mock data) tài khoản người dùng hệ thống
  const mockUsers = [
    {
      id: 1,
      name: "Chiêm Thái Sơn",
      email: "chiamthaison@gmail.com",
      avatar: null, // Sẽ hiển thị chữ cái đầu hoặc icon mặc định
      role: "Admin",
      status: "Active",
      joinedDate: "Mar 12, 2026",
      postsCount: 24,
    },
    {
      id: 2,
      name: "Eleanor Vance",
      email: "eleanor.v@journal.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      role: "Editor",
      status: "Active",
      joinedDate: "Oct 24, 2023",
      postsCount: 142,
    },
    {
      id: 3,
      name: "Thomas Hardy",
      email: "hardy.thomas@outlook.com",
      avatar: null,
      role: "Subscriber",
      status: "Suspended",
      joinedDate: "Jan 05, 2025",
      postsCount: 0,
    },
  ];

  // Bộ lọc tìm kiếm và phân quyền
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-10 flex flex-col gap-6 box-border">
      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e7e3dc]/50 pb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#2c2520]">
            Identity & Access
          </h1>
          <p className="text-xs sm:text-sm text-[#70655d] mt-1">
            Manage user accounts, assign roles, and monitor system access
            permissions.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4a3b32] hover:bg-[#382c25] text-white rounded-xl border-none font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm shrink-0">
          <UserPlus className="w-4 h-4" />
          Invite New User
        </button>
      </div>

      {/* 2. TOOLBAR (Search & Quick Filter) */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-white p-4 rounded-xl border border-[#e7e3dc]/60 shadow-[0_2px_12px_-3px_rgba(112,79,56,0.02)]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a08e81]" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#fdfbf7] border border-[#e7e3dc] rounded-lg font-sans text-xs focus:outline-none focus:border-[#4a3b32] text-[#2c2520] transition-colors"
          />
        </div>

        {/* Lọc nhanh theo chức vụ */}
        <div className="flex items-center gap-2 overflow-x-auto font-sans text-xs font-semibold">
          <span className="text-[#a08e81] items-center gap-1 shrink-0 mr-1 hidden sm:flex">
            <Filter className="w-3.5 h-3.5" /> Role:
          </span>
          {["All", "Admin", "Editor", "Subscriber"].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-lg border cursor-pointer transition-all whitespace-nowrap ${
                roleFilter === role
                  ? "bg-[#4a3b32] text-white border-[#4a3b32]"
                  : "bg-[#fdfbf7] border-[#e7e3dc] text-[#70655d] hover:border-[#a08e81]"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* 3. USERS TABLE LIST */}
      <div className="bg-white border border-[#e7e3dc]/80 rounded-2xl overflow-hidden shadow-[0_4px_25px_-5px_rgba(112,79,56,0.03)] flex flex-col">
        <div className="w-full overflow-x-auto scrollbar-thin">
          <table className="w-full border-collapse text-left font-sans text-xs min-w-[800px]">
            <thead>
              <tr className="border-b border-[#f4f1eb] bg-[#fdfbf7] text-[#a08e81] font-bold uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold w-[30%]">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Joined Date</th>
                <th className="px-6 py-4 font-semibold">Contributions</th>
                <th className="px-6 py-4 font-semibold text-center w-[100px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4f1eb] text-[#70655d] font-medium">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-[#fdfbf7]/50 transition-colors group"
                  >
                    {/* Cột thông tin User (Avatar + Tên + Email) */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt=""
                            className="w-9 h-9 rounded-full object-cover border border-[#e7e3dc] shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#4a3b32] flex items-center justify-center text-white font-sans text-xs font-bold shrink-0">
                            {user.name[0].toUpperCase()}
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <span className="text-[#2c2520] font-semibold block truncate">
                            {user.name}
                          </span>
                          <span className="text-[#a08e81] text-[11px] font-normal flex items-center gap-1 mt-0.5 truncate">
                            <Mail className="w-3 h-3 shrink-0" /> {user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Cột Vai trò (Role Badge) */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-[#2c2520]">
                        <Shield
                          className={`w-3.5 h-3.5 ${user.role === "Admin" ? "text-[#704f38]" : "text-[#a08e81]"}`}
                        />
                        <span className="font-semibold">{user.role}</span>
                      </div>
                    </td>

                    {/* Cột Trạng thái (Status) */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          user.status === "Active"
                            ? "bg-[#edf7ed] text-[#2e7d32]"
                            : "bg-[#fdeded] text-[#c62828]"
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full ${user.status === "Active" ? "bg-[#2e7d32]" : "bg-[#c62828]"}`}
                        />
                        {user.status}
                      </span>
                    </td>

                    {/* Cột Ngày tham gia */}
                    <td className="px-6 py-4 text-[#a08e81] whitespace-nowrap">
                      {user.joinedDate}
                    </td>

                    {/* Cột số lượng bài viết đã đóng góp */}
                    <td className="px-6 py-4 font-mono whitespace-nowrap">
                      {user.postsCount} posts
                    </td>

                    {/* Cột hành động quản trị nhanh */}
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        {user.status === "Active" ? (
                          <button
                            className="p-1.5 text-[#70655d] hover:text-[#c62828] hover:bg-[#fdeded] rounded-lg border-none bg-transparent cursor-pointer transition-colors"
                            title="Suspend User"
                          >
                            <UserX className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            className="p-1.5 text-[#2e7d32] hover:bg-[#edf7ed] rounded-lg border-none bg-transparent cursor-pointer transition-colors"
                            title="Activate User"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button className="p-1.5 text-[#70655d] hover:text-[#2c2520] hover:bg-[#f5f1ea] rounded-lg border-none bg-transparent cursor-pointer transition-colors">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center font-sans text-sm text-[#a08e81]"
                  >
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 4. FOOTER PHÂN TRANG */}
        <div className="px-4 sm:px-6 py-4 border-t border-[#f4f1eb] flex items-center justify-between font-sans text-xs font-semibold text-[#70655d]">
          <span className="hidden sm:inline">
            Showing <span className="text-[#2c2520]">1</span> to{" "}
            <span className="text-[#2c2520]">{filteredUsers.length}</span> of{" "}
            <span className="text-[#2c2520]">{filteredUsers.length}</span>{" "}
            entries
          </span>
          <span className="sm:hidden">Page 1 of 1</span>

          <div className="flex items-center gap-1">
            <button
              className="p-1.5 border border-[#e7e3dc] rounded-lg bg-white text-[#a08e81] cursor-not-allowed"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 bg-[#4a3b32] text-white rounded-lg border-none cursor-pointer">
              1
            </button>
            <button className="p-1.5 border border-[#e7e3dc] rounded-lg bg-white text-[#70655d] hover:border-[#a08e81] cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsersPage;
