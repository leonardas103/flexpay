export interface AccountsData {
    groupLoanIndividualMonitoringAccounts: unknown[];
    savingsAccounts: SavingsAccount[];
    guarantorAccounts: unknown[];
}

export interface SavingsAccount {
    id: number;
    accountNo: string;
    productId: number;
    productName: string;
    shortProductName: string;
    status: AccountStatus;
    currency: Currency;
    accountBalance: number;
    accountType: AccountType;
    timeline: Timeline;
    subStatus: SubStatus;
    lastActiveTransactionDate: [number, number, number];
    depositType: DepositType;
}


export interface AccountStatus {
    id: number;
    code: string;
    value: string;
    submittedAndPendingApproval: boolean;
    approved: boolean;
    rejected: boolean;
    withdrawnByApplicant: boolean;
    active: boolean;
    closed: boolean;
    prematureClosed: boolean;
    transferInProgress: boolean;
    transferOnHold: boolean;
    matured: boolean;
}

export interface Currency {
    code: string;
    name: string;
    decimalPlaces: number;
    displaySymbol: string;
    nameCode: string;
    displayLabel: string;
}

export interface AccountType {
    id: number;
    code: string;
    value: string;
}

export interface Timeline {
    submittedOnDate: [number, number, number];
    submittedByUsername: string;
    submittedByFirstname: string;
    submittedByLastname: string;
    approvedOnDate: [number, number, number];
    approvedByUsername: string;
    approvedByFirstname: string;
    approvedByLastname: string;
    activatedOnDate: [number, number, number];
}

export interface SubStatus {
    id: number;
    code: string;
    value: string;
    none: boolean;
    inactive: boolean;
    dormant: boolean;
    escheat: boolean;
    block: boolean;
    blockCredit: boolean;
    blockDebit: boolean;
}

export interface DepositType {
    id: number;
    code: string;
    value: string;
}

// --------------------------------------------

export interface AccountStatus {
    id: number;
    code: string;
    value: string;
  }
  
  export interface Timeline {
    submittedOnDate: [number, number, number];
    activatedOnDate: [number, number, number];
    activatedByUsername: string;
    activatedByFirstname: string;
    activatedByLastname: string;
  }
  
  export interface LegalForm {
    id: number;
    code: string;
    value: string;
  }
  
  export interface Client {
    id: number;
    accountNo: string;
    status: AccountStatus;
    active: boolean;
    activationDate: [number, number, number];
    firstname: string;
    lastname: string;
    displayName: string;
    isStaff: boolean;
    officeId: number;
    officeName: string;
    timeline: Timeline;
    savingsProductName: string;
    savingsAccountId: number;
    legalForm: LegalForm;
    clientCollateralManagements: unknown[];
    groups: unknown[];
  }

