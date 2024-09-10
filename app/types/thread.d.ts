type Thread = {
    id: number;
    title: string;
    description: string;
    username: string;
    creationDate: string;
    comments: Comment[];
    locked: boolean;
    type: 'Regular';
};

type Comment = {
    id: number;
    username: string;
    content: string;
    createdAt: string;
}

type QNAThread = Thread & {
    type: 'QNA';
    isAnswered: boolean
    acceptedAnswerId?: number
};

