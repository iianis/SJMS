export interface DropdownItem {
    value: number;
    label: string;
}

export const DonationTypes: DropdownItem[] = [
    {
        value: 1, label: 'Education'
    }, {
        value: 2, label: 'Jakat'
    }, {
        value: 3, label: 'Qurbani'
    }, {
        value: 4, label: 'Sadaka'
    }, {
        value: 5, label: 'Other'
    },
];

export const getDonationType = (label: string) => {
    return DonationTypes.map(item => item.label == label)
}

export interface IDonation {
    id?: string;
    phone: string;
    name: string;
    amount: number;
    donationType: string;
    date: string;
    enteredBy: string;
    address?: string;
    taluka?: string;
    village?: string;
    district?: string;
    desc?: string;

}