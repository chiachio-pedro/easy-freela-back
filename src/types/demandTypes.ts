export interface UserData {
    name: string;
    aboutMe: string;
    email: string;
    phone: string;
    portfolioLink: string;
    linkedInLink: string;
    gitHubLink: string;
    contractorEmail: string;
   }

export interface FieldsToUpdate {
	title?: string;
	description?: string;
	skills?: string;
	invoice?: boolean;
	link?: string;
	dead_line?: Date | null;
	demand_id?: number | null;
  }
