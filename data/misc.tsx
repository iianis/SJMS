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
        id: 2, name: 'Jaqat'
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
    eventExpires?: string;
    createdOn?: string;
    createdBy?: string;
    updatedOn?: string;
    updatedBy?: string;
}

export const eventTypes: ListItem[] = [
    { id: 1, name: 'Meeting' },
    { id: 2, name: 'Wedding' },
    { id: 3, name: 'Achievements' },
    { id: 4, name: 'Medical' },
    { id: 5, name: 'Sports' },
    { id: 9, name: 'Death' },
    { id: 10, name: 'Meeting - Annual General' },
    { id: 11, name: 'Meeting - Director Board' },
    { id: 12, name: 'Meeting - Adhiveshan' },
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
    approvedOn: string;
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

export const environments = {
    Dev: 1,
    Sandbox: 2,
    Prod: 3
}

export const dBTables = {
    requests: 1,
    members: 2,
    donations: 3,
    alerts: 4,
    schemes: 5,
};
