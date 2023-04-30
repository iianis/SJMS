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
    { id: 99, name: 'Other' },
];