export interface ListItem {
    id: number;
    name: string;
    public?: boolean;
    displayOrder?: number;
}

export const donationTypes: ListItem[] = [
    {
        id: 1, name: 'Education'
    }, {
        id: 2, name: 'Zaqat'
    }, {
        id: 3, name: 'Qurbani'
    }, {
        id: 4, name: 'Sadaqa'
    }, {
        id: 5, name: 'Member Fee'
    }, {
        id: 6, name: 'Member Yearly'
    }, {
        id: 7, name: 'Founder Member'
    }, {
        id: 99, name: 'Other'
    },
];

export interface IDonation {
    id?: string;
    phone: string;
    name: string;
    amount: number;
    donationType: string;
    donationTypeId: number;
    address?: string;
    taluka?: string;
    village?: string;
    villageId?: number;
    talukaId?: number;
    desc?: string;
    district?: string;
    receiptNumber?: string;
    deleted?: boolean;
    receivedBy: string;
    receivedOn: string;
    updatedBy?: string;
    updatedOn?: string;

}

export interface IEvent {
    eventType: string;
    eventTypeId: number;
    name?: string;
    description: string;
    deleted: boolean;
    location?: string;
    eventDate: string;
    eventTime: string;
    eventExpires?: string;
    createdOn?: string;
    createdBy?: string;
    updatedOn?: string;
    updatedBy?: string;
}

export const eventTypes: ListItem[] = [
    { id: 1, name: 'Meeting' },
    { id: 11, name: 'Meeting - Director Board' },
    { id: 10, name: 'Meeting - Annual General' },
    { id: 12, name: 'Meeting - Adhiveshan' },
    { id: 3, name: 'Achievements' },
    { id: 5, name: 'Sports' },
    { id: 4, name: 'Medical Camp' },
    { id: 2, name: 'Wedding' },
    { id: 9, name: 'Death' },
    { id: 99, name: 'Other' },
];

export interface IRequest {
    requestType: string;
    requestTypeId: number;
    amount: number;
    phone: string;
    name: string;
    description: string;
    taluka: string;
    village: string;
    talukaId: number;
    villageId: number;
    district: string;
    deleted: boolean;
    approvedDate: string;
    approvedAmount: number;
    approved?: boolean;
    paid?: boolean;
    createdOn?: string;
    createdBy?: string;
    updatedOn?: string;
    updatedBy?: string;
}

export const requestTypes: ListItem[] = [
    { id: 1, name: 'Education' },
    { id: 2, name: 'Healthcare' },
    { id: 3, name: 'Business' },
    { id: 99, name: 'Other' },
];

export const environment = {
    title: "dev" // sand // prod
}

export interface IdBTable {
    requests: string;
    members: string;
    donations: string;
    events: string;
    alerts: string;
    schemes: string;
};

export const dBTables: IdBTable = {
    requests: "requests",
    members: "members",
    donations: "donations",
    events: "events",
    alerts: "alerts",
    schemes: "schemes",
};

export const dBTable = (tableName: string) => {
    //console.log("table 2 fetch from:", environment.title + dBTables[tableName]);
    return environment.title + "-" + dBTables[tableName];
}