export type Job = {
    id: number;
    name: string;
    description: string;
    profile: string;
    published_at: Date;
    contract_type: {
        en: string;
    };
    office: {
        name: string;
    };
};

export type defaultStateFilters = {
    searchInput: string;
    publishedAfter: string | null;
    contractType: string;
    contractTypes: string[];
    groupBy: string;
    groupsBy: string[];
};
