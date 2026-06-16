import { Badge } from "./badge";

export type ApplicationStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "ACCEPTED"
  | "REJECTED";

type StatusBadgeProps = {
  status: ApplicationStatus;
  className?: string;
};

const statusConfig: Record<
  ApplicationStatus,
  {
    label: string;
    variant: "secondary" | "info" | "warning" | "success" | "danger";
  }
> = {
  DRAFT: {
    label: "Draft",
    variant: "secondary",
  },
  SUBMITTED: {
    label: "Submitted",
    variant: "info",
  },
  UNDER_REVIEW: {
    label: "Under Review",
    variant: "warning",
  },
  ACCEPTED: {
    label: "Accepted",
    variant: "success",
  },
  REJECTED: {
    label: "Rejected",
    variant: "danger",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
