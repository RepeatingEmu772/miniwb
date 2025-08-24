export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
}

export interface PersonalInfo {
  name: string;
  role?: string;
  bio?: string;
}

export interface Section {
  id: string;
  title: string;
  content: string;
}
