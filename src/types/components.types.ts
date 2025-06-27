export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  trigger?: React.ReactNode;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}
