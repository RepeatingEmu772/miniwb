export interface NavigationItem {
  label: string;
  path: string;
}

export type Route = () => HTMLElement;

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
