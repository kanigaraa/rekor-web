export type Role = "APPLICANT" | "REVIEWER" | "ADMIN" | "SUPER_ADMIN";

export const PUBLIC_ROUTES = ["/", "/login", "/register", "/unauthorized"];

export const APPLICANT_ROLES = ["APPLICANT", "SUPER_ADMIN"] as const;
export const REVIEWER_ROLES = ["REVIEWER", "ADMIN", "SUPER_ADMIN"] as const;
export const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"] as const;
export const SUPER_ADMIN_ROLES = ["SUPER_ADMIN"] as const;

export function isRoleAllowed(role: Role, allowedRoles: readonly Role[]) {
  return allowedRoles.includes(role);
}

export function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.includes(pathname);
}

export function getRequiredRolesForPath(pathname: string) {
  if (isPublicRoute(pathname)) {
    return null;
  }

  if (pathname === "/dashboard") {
    return ["APPLICANT", "REVIEWER", "ADMIN", "SUPER_ADMIN"] as const;
  }

  if (pathname === "/apply" || pathname === "/my-application") {
    return APPLICANT_ROLES;
  }

  if (pathname.startsWith("/reviewer/applications")) {
    return REVIEWER_ROLES;
  }

  if (pathname.startsWith("/admin/applications")) {
    return ADMIN_ROLES;
  }

  if (
    pathname === "/admin/users" ||
    pathname.startsWith("/admin/users/") ||
    pathname === "/admin/activity-logs" ||
    pathname.startsWith("/admin/activity-logs/")
  ) {
    return SUPER_ADMIN_ROLES;
  }

  if (pathname.startsWith("/admin")) {
    return SUPER_ADMIN_ROLES;
  }

  return null;
}

export function canAccessPath(pathname: string, role: Role) {
  const requiredRoles = getRequiredRolesForPath(pathname);

  if (!requiredRoles) {
    return true;
  }

  return isRoleAllowed(role, requiredRoles);
}
