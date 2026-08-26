import type { AadhaarFamilyMember, AadhaarRecord } from "@jeevansetu/shared";

/**
 * MOCK UIDAI / AADHAAR REGISTRY.
 *
 * This file stands in for an external system this application does not own and
 * cannot write to. It is the ONLY source of personal data in JeevanSetu — name,
 * date of birth, gender, address, and the family relationships used for attestation
 * all originate here and are projected onto the local user record on login.
 *
 * Two consequences the rest of the codebase depends on:
 *   1. No screen offers to edit personal details; there is nowhere to write them to.
 *   2. Family members cannot be invented by the pensioner. An attester who is not in
 *      the Aadhaar record simply does not exist, which closes the obvious fraud path
 *      of adding a friend and having them vouch for you.
 *
 * Nothing here is real. The UIDs are syntactically valid but deliberately outside
 * any issued range, and every record is fictional.
 */

export function maskUid(uid: string): string {
  const digits = uid.replace(/\D/g, "");
  return `XXXX XXXX ${digits.slice(-4)}`;
}

export function maskMobile(mobile: string): string {
  return `XXXXXX${mobile.slice(-4)}`;
}

function member(
  uid: string,
  nameEn: string,
  nameHi: string,
  relation: string,
  dob: string,
  gender: AadhaarFamilyMember["gender"],
  mobile: string,
  mobileVerified: boolean
): AadhaarFamilyMember {
  return {
    uid,
    maskedUid: maskUid(uid),
    name: { en: nameEn, hi: nameHi },
    relation,
    dob,
    gender,
    mobile,
    maskedMobile: maskMobile(mobile),
    mobileVerified,
  };
}

export const AADHAAR_RECORDS: AadhaarRecord[] = [
  {
    uid: "784239015566",
    maskedUid: maskUid("784239015566"),
    name: { en: "Ram Prasad Sharma", hi: "राम प्रसाद शर्मा" },
    careOf: "S/O Bhairav Prasad Sharma",
    dob: "1958-04-12",
    gender: "male",
    photoInitials: "RS",
    address: {
      house: "H.No. 24",
      street: "Gomti Nagar, Vibhuti Khand",
      district: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226010",
    },
    registeredMobile: "9876543210",
    maskedMobile: maskMobile("9876543210"),
    email: "r.sharma@example.invalid",
    locale: "hi",
    family: [
      member("445120983371", "Anita Sharma", "अनीता शर्मा", "Daughter", "1985-06-21", "female", "9811100011", true),
      member("445120983372", "Suresh Sharma", "सुरेश शर्मा", "Son", "1982-03-09", "male", "9811100012", true),
    ],
  },
  {
    uid: "552177348890",
    maskedUid: maskUid("552177348890"),
    name: { en: "Kamla Devi", hi: "कमला देवी" },
    careOf: "W/O Late Ram Naresh Prasad",
    dob: "1949-11-02",
    gender: "female",
    photoInitials: "KD",
    address: {
      house: "H.No. 8/3",
      street: "Kankarbagh Colony",
      district: "Patna",
      state: "Bihar",
      pincode: "800020",
    },
    registeredMobile: "9876543211",
    maskedMobile: maskMobile("9876543211"),
    email: null,
    locale: "hi",
    family: [
      member("662301447789", "Suresh Kumar", "सुरेश कुमार", "Son", "1974-01-14", "male", "9822200022", true),
      // Linked in the Aadhaar record but with no verified mobile, so she cannot attest.
      member("662301447790", "Meena Devi", "मीना देवी", "Daughter-in-law", "1979-08-30", "female", "9822200023", false),
    ],
  },
  {
    uid: "669044123378",
    maskedUid: maskUid("669044123378"),
    name: { en: "George Mathew", hi: "जॉर्ज मैथ्यू" },
    careOf: "S/O Mathew Varghese",
    dob: "1955-07-19",
    gender: "male",
    photoInitials: "GM",
    address: {
      house: "Puthenpurayil House",
      street: "Panampilly Nagar",
      district: "Ernakulam",
      state: "Kerala",
      pincode: "682036",
    },
    registeredMobile: "9876543212",
    maskedMobile: maskMobile("9876543212"),
    email: "g.mathew@example.invalid",
    locale: "en",
    // Deliberately empty: the hardest real case is a pensioner living alone with
    // nobody on record to vouch for them. This persona must still be able to finish.
    family: [],
  },
  {
    uid: "331288765401",
    maskedUid: maskUid("331288765401"),
    name: { en: "Aarav Menon", hi: "आरव मेनन" },
    careOf: "S/O Rajeev Menon",
    dob: "2001-02-17",
    gender: "male",
    photoInitials: "AM",
    address: {
      house: "Flat 402, Sobha Orion",
      street: "Indiranagar 100ft Road",
      district: "Bengaluru Urban",
      state: "Karnataka",
      pincode: "560038",
    },
    registeredMobile: "9876543213",
    maskedMobile: maskMobile("9876543213"),
    email: "aarav.menon@example.invalid",
    locale: "en",
    family: [
      member("778450112264", "Latha Menon", "लता मेनन", "Mother", "1972-12-05", "female", "9844400044", true),
    ],
  },
];

export function findAadhaarByMobile(mobile: string): AadhaarRecord | null {
  return AADHAAR_RECORDS.find((r) => r.registeredMobile === mobile) ?? null;
}

export function findAadhaarByUid(uid: string): AadhaarRecord | null {
  return AADHAAR_RECORDS.find((r) => r.uid === uid) ?? null;
}

/**
 * Only an adult relative with a mobile number UIDAI has verified may act as an
 * attester. Everyone else is still shown, so the pensioner understands why the
 * option is unavailable rather than wondering where their relative went.
 */
export function canAttest(m: AadhaarFamilyMember, asOf = new Date()): boolean {
  const age = (asOf.getTime() - new Date(m.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  return m.mobileVerified && age >= 18;
}
