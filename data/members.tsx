/*

                    <CustomTextInput
                        label="Password"
                        iconName="lock"
                        error={errors.password}
                        placeholder="Enter password"
                        password
                        onFocus={() => { handleError('password', null) }}
                        onChangeText={text => handleOnChange('password', text)}
                    />
                    <CustomTextInput
                        label="Email"
                        iconName="email"
                        error={errors.email}
                        placeholder="Enter email address"
                        onFocus={() => { handleError('email', null) }}
                        onChangeText={text => handleOnChange('email', text)}
                    />
                    if (!inputs.email) {
            handleError('email', 'Please enter email address');
            valid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('email', 'Please enter valid email address');
            valid = false;
        }
                    */

export interface member {
  id: number;
  salutation: string;
  address?: string;
  name: string;
  taluka: string;
  memberType: string;
}

export const memberTypes = [
  'Founder Member',
  'President',
  'Vice-president',
  'Secretary',
  'Treasurer',
  'Director',
  'Volunteer',
  'Member',
];

export const members: member[] = [
  {
    id: 1,
    salutation: 'Mr.',
    name: 'Majjidbhai Shikalgar',
    address: '123, Yadogopal Peth, Satara 41502',
    taluka: 'Satara',
    memberType: 'Founder Member',
  },
  {
    id: 2,
    salutation: 'Mr.',
    name: 'Babubhai Shikalgar',
    taluka: 'Karad',
    memberType: 'President',
  },
  {
    id: 3,
    salutation: 'Mr.',
    name: 'Huseinbhai Shikalgar',
    taluka: 'Wardhangad',
    memberType: 'Vice-president',
  },
  {
    id: 4,
    salutation: 'Mr.',
    name: 'Rafiqbhai Shikalgar',
    taluka: 'Koregaon',
    memberType: 'Secretary',
  },
  {
    id: 5,
    salutation: 'Mr.',
    name: 'Shabbirbhai Shikalgar',
    taluka: 'Satara',
    memberType: 'Treasurer',
  },
  {
    id: 6,
    salutation: 'Mr.',
    name: 'Sirajbhai Shikalgar',
    taluka: 'Waduj',
    memberType: 'Director',
  },
  {
    id: 7,
    salutation: 'Mrs.',
    name: 'Hazarabi Shikalgar',
    taluka: 'Wathar',
    memberType: 'Director',
  },
  {
    id: 8,
    salutation: 'Mr.',
    name: 'Zhakirbhai Shikalgar',
    taluka: 'Malakapur',
    memberType: 'Director',
  },
  {
    id: 9,
    salutation: 'Mr.',
    name: 'Shabbirbhai Shikalgar',
    taluka: 'Rethare',
    memberType: 'Director',
  },
  {
    id: 10,
    salutation: 'Mr.',
    name: 'Nazirbhai Shikalgar',
    taluka: 'Virali',
    memberType: 'Director',
  },
  {
    id: 11,
    salutation: 'Mr.',
    name: 'Maulabhai Shikalgar',
    taluka: 'Nagthane',
    memberType: 'Director',
  },
  {
    id: 12,
    salutation: 'Mr.',
    name: 'Anis Nijamuddin Shikalgar',
    taluka: 'Satara',
    memberType: 'Advisor',
  },
  {
    id: 13,
    salutation: 'Mr.',
    name: 'Jameerbhai Shikalgar',
    taluka: 'Ogalewadi',
    memberType: 'Volunteer',
  },
  {
    id: 14,
    salutation: 'Mr.',
    name: 'Ramzaanbhai Shikalgar',
    taluka: 'Nagthane',
    memberType: 'Volunteer',
  },
  {
    id: 15,
    salutation: 'Mrs.',
    name: 'Shamimbi Shikalgar',
    taluka: 'Virali',
    memberType: 'Volunteer',
  },
  {
    id: 16,
    salutation: 'Mr.',
    name: 'Maulabhai Shikalgar',
    taluka: 'Shenoli',
    memberType: 'Volunteer',
  },
  {
    id: 17,
    salutation: 'Mrs.',
    name: 'Hajarabi Shikalgar',
    taluka: 'Satara',
    memberType: 'Volunteer',
  },
  {
    id: 18,
    salutation: 'Mr.',
    name: 'Nadimbhai Shikalgar',
    taluka: 'Kaledhon',
    memberType: 'Volunteer',
  },
  {
    id: 19,
    salutation: 'Mr.',
    name: 'Haroonbhai Shikalgar',
    taluka: 'Wathar',
    memberType: 'Volunteer',
  },
  {
    id: 20,
    salutation: 'Mr.',
    name: 'Mubarakbhai Shikalgar',
    taluka: 'Waduj',
    memberType: 'Volunteer',
  },
  {
    id: 21,
    salutation: 'Mr.',
    name: 'Rashidbhai Shikalgar',
    taluka: 'Khatav',
    memberType: 'Volunteer',
  },
  {
    id: 22,
    salutation: 'Mr.',
    name: 'Dilawarbhai Shikalgar',
    taluka: 'Karad',
    memberType: 'Volunteer',
  },
  {
    id: 23,
    salutation: 'Mr.',
    name: 'Salimbhai Shikalgar',
    taluka: 'Umbraj',
    memberType: 'Volunteer',
  },
  {
    id: 24,
    salutation: 'Mr.',
    name: 'Sameerbhai Shikalgar',
    taluka: 'Ubraj',
    memberType: 'Volunteer',
  },
  {
    id: 25,
    salutation: 'Mr.',
    name: 'Naushad Shikalgar',
    taluka: 'Karad',
    memberType: 'Volunteer',
  },
];

// color scheme ? blue - 0A5689 , yellow - F9D162, orange - F4944F,
// powder green - 6BC6A5, surf green - 21C393

//dreamy gradient = light white -F9FAFE, surf blue - 92B2FD, violet - AE7FFB
// heavy pink - F694B7, light purple - CCCFF7

//pestal color -
