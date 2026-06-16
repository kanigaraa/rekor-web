type UserMenuProps = {
  name: string;
  roleLabel: string;
};

export function UserMenu({ name, roleLabel }: UserMenuProps) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-2">
      <span className="flex size-8 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
        {name.charAt(0).toUpperCase()}
      </span>
      <span className="hidden text-left sm:block">
        <span className="block text-sm font-medium leading-4 text-text-primary">
          {name}
        </span>
        <span className="block text-xs text-text-muted">{roleLabel}</span>
      </span>
    </div>
  );
}
