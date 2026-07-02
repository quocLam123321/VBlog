import { useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '~/components/ui/table'
import {
  Search,
  UserPlus,
  Shield,
  UserX,
  Mail,
  MoreVertical
} from 'lucide-react'
import { getUsersAPI } from '~/apis'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CustomPagination from '~/components/CustomPagination'
import { DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '~/utils/constants'

function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [listUsers, setListUsers] = useState([])
  const [totalPages, setTotalPages] = useState(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const page = parseInt(searchParams.get('page') || DEFAULT_PAGE, 10)

  useEffect(() => {
    getUsersAPI(`?page=${page}&limit=${DEFAULT_ITEMS_PER_PAGE}`)
      .then(res => {
        setListUsers(res.users)
        setTotalPages(Math.ceil(res.totalItem / DEFAULT_ITEMS_PER_PAGE))
        // setTotalPages(mockUsers.length)
      })
  }, [page])

  const handlePageChange = newPage => {
    navigate(`?page=${newPage}`)
  }


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

      {/* 2. TOOLBAR (Search) */}
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
      </div>

      {/* 3. USERS TABLE LIST */}
      <div className="bg-white border border-[#e7e3dc]/80 rounded-2xl overflow-hidden shadow-[0_4px_25px_-5px_rgba(112,79,56,0.03)] flex flex-col">
        <Table className="font-sans text-xs">
          <TableHeader>
            <TableRow className="border-b border-[#f4f1eb] bg-[#fdfbf7] hover:bg-[#fdfbf7]">
              <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[#a08e81] w-[30%]">User</TableHead>
              <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[#a08e81]">Role</TableHead>
              <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[#a08e81]">Joined Date</TableHead>
              <TableHead className="px-6 py-4 font-bold uppercase tracking-wider text-[#a08e81] text-center w-25">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[#70655d] font-medium">
            {listUsers.length > 0 ? (
              listUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-b border-[#f4f1eb] hover:bg-[#fdfbf7]/50 transition-colors group"
                >
                  {/* Cột thông tin User (Avatar + Tên + Email) */}
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt=""
                          className="w-9 h-9 rounded-full object-cover border border-[#e7e3dc] shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#4a3b32] flex items-center justify-center text-white font-sans text-xs font-bold shrink-0">
                          {(user.user_name || 'U')[0].toUpperCase()}
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <span className="text-[#2c2520] font-semibold block truncate">
                          {user.user_name || 'Unknown'}
                        </span>
                        <span className="text-[#a08e81] text-[11px] font-normal flex items-center gap-1 mt-0.5 truncate">
                          <Mail className="w-3 h-3 shrink-0" /> {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Cột Vai trò (Role Badge) */}
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-[#2c2520] lowercase">
                      <Shield
                        className={`w-3.5 h-3.5 ${(user.role || 'user').toLowerCase() === 'admin' ? 'text-[#704f38]' : 'text-[#a08e81]'}`}
                      />
                      <span className="font-semibold">{user.role || 'user'}</span>
                    </div>
                  </TableCell>

                  {/* Cột Ngày tham gia */}
                  <TableCell className="px-6 py-4 text-[#a08e81] whitespace-nowrap">
                    {user.created_at}
                  </TableCell>

                  {/* Cột hành động quản trị nhanh */}
                  <TableCell className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        className="p-1.5 text-[#70655d] hover:text-[#c62828] hover:bg-[#fdeded] rounded-lg border-none bg-transparent cursor-pointer transition-colors"
                        title="Suspend User"
                      >
                        <UserX className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 text-[#70655d] hover:text-[#2c2520] hover:bg-[#f5f1ea] rounded-lg border-none bg-transparent cursor-pointer transition-colors">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="px-6 py-10 text-center font-sans text-sm text-[#a08e81]"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="bg-[#fdfbf7] py-3 border-t border-[#f4f1eb]">
          <CustomPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminUsersPage
