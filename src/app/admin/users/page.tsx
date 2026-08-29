import { getAllUsers } from "@/lib/services/user.service";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Manage Users" };

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : undefined;
  const role = typeof params.role === "string" ? params.role : undefined;

  const { users, total, totalPages, currentPage } = await getAllUsers({
    search,
    role,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">Users ({total})</h1>
      </div>

      {/* Search */}
      <form className="mb-6" method="get">
        <div className="flex gap-3">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search users..."
            className="flex-1 max-w-md px-4 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            name="role"
            defaultValue={role || ""}
            className="px-4 py-2 bg-secondary border border-border rounded-lg text-foreground text-sm focus:outline-none"
          >
            <option value="">All Roles</option>
            <option value="USER">User</option>
            <option value="INSTRUCTOR">Instructor</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
          >
            Search
          </button>
        </div>
      </form>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  User
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Email
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Role
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  XP
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-secondary/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-red-500/10 text-red-400"
                          : user.role === "INSTRUCTOR"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        user.isActive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {user.xp}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {formatDate(user.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/admin/users?page=${p}${search ? `&search=${search}` : ""}${role ? `&role=${role}` : ""}`}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${
                p === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
